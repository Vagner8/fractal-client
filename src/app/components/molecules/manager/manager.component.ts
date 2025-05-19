import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { EventService, FractalService, StatesService } from '@services';
import { CAppEvents } from '@constants';

const { Hold, Touch } = CAppEvents;

@Component({
  selector: 'app-manager',
  imports: [MatButtonModule, SpinnerComponent, TapDirective],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent {
  prevEvent: string = Touch;

  es = inject(EventService);
  private readonly ss = inject(StatesService);
  private readonly fs = inject(FractalService);

  onHold(): void {
    this.prevEvent = Hold;
    this.es.$managerEvent.set(Hold);
    this.fs.navigateManager(Hold);
  }

  onTouch(): void {
    const { modifiers, collections } = this.fs;
    if (this.prevEvent === Touch) {
      this.ss.sidenavTaps.$value.update(prev => (prev === collections ? modifiers : collections));
    }
    this.prevEvent = Touch;
    this.es.$managerEvent.set(Touch);
    this.fs.navigateManager(Touch);
  }
}
