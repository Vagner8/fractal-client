import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { EventService, FractalService, StatesService } from '@services';
import { APP_EVENTS } from '@constants';

@Component({
  selector: 'app-manager',
  imports: [MatButtonModule, SpinnerComponent, TapDirective],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent {
  prevEvent: string = APP_EVENTS.TOUCH;

  es = inject(EventService);
  ss = inject(StatesService);
  fs = inject(FractalService);

  onHold(): void {
    this.prevEvent = APP_EVENTS.HOLD;
    this.es.$managerEvent.set(APP_EVENTS.HOLD);
    this.fs.navigateManager(APP_EVENTS.HOLD);
  }

  onTouch(): void {
    const { modifiers, collections } = this.fs;
    if (this.prevEvent === APP_EVENTS.TOUCH) {
      this.ss.$sidenavTaps.update(prev => (prev === collections ? modifiers : collections));
    }
    this.prevEvent = APP_EVENTS.TOUCH;
    this.es.$managerEvent.set(APP_EVENTS.TOUCH);
    this.fs.navigateManager(APP_EVENTS.TOUCH);
  }
}
