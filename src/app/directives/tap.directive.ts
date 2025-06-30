import { Directive, ElementRef, inject, Input, OnDestroy, OnInit, output } from '@angular/core';
import { HOLD_THRESHOLD } from '@constants';
import { StatesService } from '@services';
import { fromEvent, map, merge, race, Subscription, switchMap, takeUntil, tap, timer } from 'rxjs';

@Directive({
  selector: '[appTap]',
  standalone: true,
})
export class TapDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly ss = inject(StatesService);

  @Input() disableHoldEvent = false;

  hold = output();
  touch = output();

  private readonly sbs: Subscription[] = [];

  ngOnInit(): void {
    const pointerUp$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerup');
    const pointerDown$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerdown');
    const pointerLeave$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerleave');

    this.sbs.push(
      pointerDown$
        .pipe(
          tap(() => {
            if (this.disableHoldEvent) return;
            this.ss.$isHoldEventRunning.set(true);
          }),
          switchMap(() =>
            race(
              timer(HOLD_THRESHOLD).pipe(map(() => true)),
              merge(pointerUp$, pointerLeave$).pipe(map(() => false))
            ).pipe(
              tap(isTimerCompleted => {
                if (isTimerCompleted) {
                  this.hold.emit();
                }

                this.ss.$isHoldEventRunning.set(false);
              })
            )
          )
        )
        .subscribe()
    );

    this.sbs.push(
      pointerDown$
        .pipe(
          switchMap(() =>
            pointerUp$.pipe(
              takeUntil(timer(HOLD_THRESHOLD)),
              takeUntil(pointerLeave$),
              tap(() => this.touch.emit())
            )
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.sbs.forEach(sb => sb.unsubscribe());
  }
}
