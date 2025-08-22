import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@atoms';
import { StatesService } from '@services';
import { TapEvents } from '@types';

@Component({
  selector: 'app-manager',
  imports: [MatButtonModule, SpinnerComponent, TapDirective],
  templateUrl: './manager.html',
  styleUrl: './manager.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Manager {
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
