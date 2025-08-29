import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule, MatProgressSpinnerModule } from '@mat';
import { TapEvents } from '@directives';
import { EventsService } from '@services';
import { filter, map, merge, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-manager',
  imports: [MatButtonModule, MatProgressSpinnerModule, TapEvents, AsyncPipe],
  templateUrl: './manager.html',
  styleUrl: './manager.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Manager implements OnInit {
  es = inject(EventsService);
  color$!: Observable<string>;

  ngOnInit(): void {
    const defaultColor = 'rgb(245, 245, 245)';

    this.color$ = merge(
      this.es.holdEventInterval$.pipe(
        map((num) => {
          if (num <= 33) {
            const t = num / 33;
            const r = this.lerp(245, 40, t);
            const g = this.lerp(245, 167, t);
            const b = this.lerp(245, 69, t);
            return `rgb(${r}, ${g}, ${b})`;
          }

          if (num <= 66) {
            const t = (num - 33) / 33;
            const r = this.lerp(40, 255, t);
            const g = this.lerp(167, 193, t);
            const b = this.lerp(69, 7, t);
            return `rgb(${r}, ${g}, ${b})`;
          }

          const t = (num - 66) / 34;
          const r = this.lerp(255, 255, t);
          const g = this.lerp(193, 64, t);
          const b = this.lerp(7, 129, t);
          return `rgb(${r}, ${g}, ${b})`;
        }),
      ),
      this.es.holdEventState$.pipe(
        filter((state) => state === 'cancel'),
        map(() => defaultColor),
      ),
    ).pipe(startWith(defaultColor));
  }

  onClick(): void {
    this.es.$drawerOpened.update((prev) => !prev);
  }

  lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
}
