import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { map, merge, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EventService, ManagerService, TapsService, EntitiesService, BaseService } from '@services';
import { ConstAppEntities, ConstAppEvents, ConstAppGroups } from '@constants';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatButtonModule, SpinnerComponent, TapDirective, AsyncPipe],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent implements OnInit {
  showSpinner$!: Observable<boolean>;
  prevEvent: keyof typeof ConstAppEvents | null = null;

  bs = inject(BaseService);
  ts = inject(TapsService);
  es = inject(EventService);
  mgr = inject(ManagerService);
  ent = inject(EntitiesService);

  ngOnInit(): void {
    this.showSpinner$ = merge(this.es.holdRun$.pipe(map(() => true)), this.es.holdEnd$.pipe(map(() => false)));
  }

  async holdAndTouch(event: keyof typeof ConstAppEvents): Promise<void> {
    if (this.prevEvent !== event) {
      await this.mgr.set(event);
    }
    if (event === ConstAppEvents.Touch && this.prevEvent !== ConstAppEvents.Hold) {
      this.ts.$taps.update(prev => (prev?.is(ConstAppEntities.Pages) ? this.ent.modifiers : this.ent.pages));
      await this.bs.navigate({ [ConstAppGroups.Taps]: this.ts.$taps()?.cursor });
    }
    this.prevEvent = event;
  }
}
