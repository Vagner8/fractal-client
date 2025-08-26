import { Directive, ElementRef, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { HoldDelay } from '@types';
import { fromEvent, map, merge, race, Subscription, switchMap, takeUntil, tap, timer } from 'rxjs';

@Directive({
  selector: '[appTapEvents]',
  standalone: true,
})
export class TapEvents implements OnInit, OnDestroy {
  $holdDelay = input<HoldDelay>(300);

  el = inject(ElementRef<HTMLElement>);

  hold = output();
  touch = output();

  sbs: Subscription[] = [];

  ngOnInit(): void {
    const pointerUp$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerup');
    const pointerDown$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerdown');
    const pointerLeave$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerleave');

    const holdDelay = this.$holdDelay();

    this.sbs.push(
      pointerDown$
        .pipe(
          switchMap(() =>
            race(timer(holdDelay).pipe(map(() => true)), merge(pointerUp$, pointerLeave$).pipe(map(() => false))).pipe(
              tap((isTimerCompleted) => {
                if (isTimerCompleted) {
                  this.hold.emit();
                }
              }),
            ),
          ),
        )
        .subscribe(),
    );

    this.sbs.push(
      pointerDown$
        .pipe(
          switchMap(() =>
            pointerUp$.pipe(
              takeUntil(timer(holdDelay)),
              takeUntil(pointerLeave$),
              tap(() => this.touch.emit()),
            ),
          ),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.sbs.forEach((sb) => sb.unsubscribe());
  }
}
