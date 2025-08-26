import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule, MatProgressSpinnerModule } from '@mat';
import { TapEvents } from '@directives';
import { EventsService } from '@services';
import { HoldDelay, IntervalId } from '@types';

@Component({
  selector: 'app-manager',
  imports: [MatButtonModule, MatProgressSpinnerModule, TapEvents],
  templateUrl: './manager.html',
  styleUrl: './manager.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Manager {
  es = inject(EventsService);
  $value = signal(0);

  intervalId!: IntervalId;
  holdDelayMap: Record<HoldDelay, { seed: number; delay: number }> = {
    300: { seed: 5, delay: 10 },
    1000: { seed: 1, delay: 10 },
  };

  onHold(): void {
    this.es.$isManagerTouched.set(false);
    clearInterval(this.intervalId);
    this.$value.set(0);
  }

  onTouch(): void {
    this.es.$isManagerTouched.set(true);
  }

  onHoldStart(holdDelay: HoldDelay): void {
    console.log('🚀 ~ onHoldStart:', holdDelay);

    const { seed, delay } = this.holdDelayMap[holdDelay];
    this.intervalId = setInterval(() => this.$value.update((prev) => prev + seed), delay);
  }

  onHoldCancel(): void {
    clearInterval(this.intervalId);
    this.$value.set(0);
  }
}
