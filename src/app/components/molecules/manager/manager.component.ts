import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { EventService, FractalService } from '@services';
import { ConstAppEvents } from '@constants';

const { Hold, Touch } = ConstAppEvents;

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatButtonModule, SpinnerComponent, TapDirective],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent {
  prevEvent: string = Touch;

  es = inject(EventService);
  private fs = inject(FractalService);

  onHold(): void {
    this.prevEvent = Hold;
    this.es.$managerEvent.set(Hold);
    this.fs.navigateManager(Hold);
  }

  onTouch(): void {
    if (this.prevEvent === Touch) {
      this.fs.modifiers?.$selected.update(prev => {
        this.fs.collections?.$selected.set(prev);
        return !prev;
      });
    }
    this.prevEvent = Touch;
    this.es.$managerEvent.set(Touch);
    this.fs.navigateManager(Touch);
  }
}
