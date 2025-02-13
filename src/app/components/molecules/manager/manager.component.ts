import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { map, merge, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EventService, ManagerService, TapsService, EntitiesService } from '@services';
import { ConstEntities, ConstEvents } from '@constants';

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
  prevEvent: string | null = null;

  private ts = inject(TapsService);
  private es = inject(EventService);
  private mgr = inject(ManagerService);
  private ent = inject(EntitiesService);

  ngOnInit(): void {
    this.showSpinner$ = merge(this.es.holdRun$.pipe(map(() => true)), this.es.holdEnd$.pipe(map(() => false)));
  }

  async holdAndTouch(event: keyof typeof ConstEvents): Promise<void> {
    if (this.prevEvent !== event) {
      this.mgr.set(event);
    }
    if (event === ConstEvents.Touch && this.prevEvent !== ConstEvents.Hold) {
      this.ts.$taps.update(prev => (prev?.is(ConstEntities.Pages) ? this.ent.modifiers : this.ent.pages));
    }
    this.prevEvent = event;
  }
}
