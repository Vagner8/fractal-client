import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { StatesService } from '@services';
import { APP_EVENTS } from '@constants';
import { TapEvents } from '@types';

@Component({
  selector: 'app-manager',
  imports: [MatButtonModule, SpinnerComponent, TapDirective],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent {
  prevEvent: TapEvents = 'touch';

  ss = inject(StatesService);

  onHold(): void {
    this.prevEvent = 'hold';
    this.ss.setManager('hold');
  }

  async onTouch(): Promise<void> {
    if (this.prevEvent === 'touch') {
      this.ss.$showModifiersTaps.update((prev) => !prev);
    }
    this.prevEvent = 'touch';
    await this.ss.setManager('touch');
  }
}
