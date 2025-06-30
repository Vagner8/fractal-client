import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { StatesService } from '@services';
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

  ss = inject(StatesService);

  onHold(): void {
    this.prevEvent = APP_EVENTS.HOLD;
    this.ss.setManager(APP_EVENTS.HOLD);
  }

  async onTouch(): Promise<void> {
    const { modifiers, collections } = this.ss;
    if (this.prevEvent === APP_EVENTS.TOUCH) {
      this.ss.$sidenavTaps.update(prev => (prev === collections ? modifiers : collections));
    }
    this.prevEvent = APP_EVENTS.TOUCH;
    await this.ss.setManager(APP_EVENTS.TOUCH);
  }
}
