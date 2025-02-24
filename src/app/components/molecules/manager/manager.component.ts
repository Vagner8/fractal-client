import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { EventService, FractalService } from '@services';
import { ConstEvents, ConstParams } from '@constants';
import { Router } from '@angular/router';

const { Hold, Touch } = ConstEvents;

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatButtonModule, SpinnerComponent, TapDirective],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent {
  prevEvent: string | null = null;

  es = inject(EventService);
  private fs = inject(FractalService);
  private router = inject(Router);

  onHold(): void {
    this.prevEvent = Hold;
    this.es.$managerEvent.set(Hold);
    this.navigate(Hold);
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
    this.navigate(ConstEvents.Touch);
  }

  private navigate(event: string): void {
    this.router.navigate([], { queryParams: { [ConstParams.Manager]: event }, queryParamsHandling: 'merge' });
  }
}
