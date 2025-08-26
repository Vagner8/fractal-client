import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule, MatProgressSpinnerModule } from '@mat';
import { TapEvents } from '@directives';
import { EventsService } from '@services';
import { delay, delayWhen, interval, map, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HoldEventDelay } from '@types';

@Component({
  selector: 'app-manager',
  imports: [MatButtonModule, MatProgressSpinnerModule, TapEvents, AsyncPipe],
  templateUrl: './manager.html',
  styleUrl: './manager.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Manager implements OnInit {
  es = inject(EventsService);
  value$!: Observable<number>;

  holdEventDelayMap: Record<HoldEventDelay, [number, number]> = {
    300: [8, 15],
    1000: [2, 15],
  };

  ngOnInit(): void {
    this.value$ = this.es.holdEvent$.pipe(
      switchMap((event) => {
        if (event.status === 'start' && event.delay) {
          const [seed, speed] = this.holdEventDelayMap[event.delay];
          return interval(speed).pipe(map((num) => (num < 5 ? 0 : num * seed)));
        } else {
          return of(0);
        }
      }),
    );
  }

  onHoldAndTouch(isTouch: boolean): void {
    this.es.$isManagerTouched.set(isTouch);
  }
}
