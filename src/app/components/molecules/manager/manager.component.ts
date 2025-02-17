import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { map, merge, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EventService, SelectService } from '@services';
import { ConstEvents } from '@constants';

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

  private es = inject(EventService);
  private ss = inject(SelectService);

  ngOnInit(): void {
    this.showSpinner$ = merge(this.es.holdRun$.pipe(map(() => true)), this.es.holdEnd$.pipe(map(() => false)));
  }

  async holdAndTouch(event: string): Promise<void> {
    if (this.prevEvent !== event) {
      await this.ss.manager.setAndNavigate(event);
    }
    if (event === ConstEvents.Touch && this.prevEvent !== ConstEvents.Hold) {
      this.ss.taps.toggle();
    }
    this.prevEvent = event;
  }
}
