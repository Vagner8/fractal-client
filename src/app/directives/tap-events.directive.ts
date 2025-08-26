import { Directive, ElementRef, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { EventsService } from '@services';
import { HoldEventDelay } from '@types';
import { fromEvent, merge, race, Subscription, switchMap, takeUntil, tap, timer } from 'rxjs';

@Directive({
  selector: '[appTapEvents]',
  standalone: true,
})
export class TapEvents implements OnInit, OnDestroy {
  $holdEventDelay = input<HoldEventDelay>(300);

  es = inject(EventsService);
  el = inject(ElementRef<HTMLElement>);

  hold = output();
  touch = output();

  sbs: Subscription[] = [];

  ngOnInit(): void {
    const pointerUp$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerup');
    const pointerDown$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerdown');
    const pointerLeave$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerleave');

    const delay = this.$holdEventDelay();

    this.sbs.push(
      pointerDown$
        .pipe(
          tap(() => this.es.holdEvent$.next({ status: 'start', delay })),
          switchMap(() =>
            race(
              timer(delay).pipe(
                tap(() => {
                  this.hold.emit();
                  this.es.holdEvent$.next({ status: 'done' });
                }),
              ),
              merge(pointerUp$, pointerLeave$).pipe(tap(() => this.es.holdEvent$.next({ status: 'cancel' }))),
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
              takeUntil(timer(delay)),
              takeUntil(pointerLeave$),
              tap(() => {
                this.es.holdEvent$.next({ status: 'idle' });
                this.touch.emit();
              }),
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
