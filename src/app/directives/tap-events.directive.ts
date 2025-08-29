import { Directive, ElementRef, inject, Input, OnDestroy, OnInit, output } from '@angular/core';
import { EventsService } from '@services';
import { HoldEvents } from '@types';
import {
  filter,
  finalize,
  fromEvent,
  interval,
  merge,
  race,
  Subscription,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';

@Directive({
  selector: '[appTapEvents]',
  standalone: true,
})
export class TapEvents implements OnInit, OnDestroy {
  @Input() lastHoldEvent?: HoldEvents;

  es = inject(EventsService);
  el = inject(ElementRef<HTMLElement>);

  touch = output();
  holdSave = output();
  holdWarning = output();
  holdDanger = output();

  sbs: Subscription[] = [];

  ngOnInit(): void {
    const holdThreshold = 200;
    const maxEmittedNumber = 100;
    const holdInterval = 15;
    let intervalNum: number;

    const pointerUp$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerup');
    const pointerDown$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerdown');
    const pointerLeave$ = fromEvent<PointerEvent>(this.el.nativeElement, 'pointerleave');

    const cancel$ = merge(pointerUp$, pointerLeave$).pipe(tap(() => this.es.holdEventState$.next('cancel')));

    const hold$ = pointerDown$
      .pipe(
        switchMap(() =>
          timer(holdThreshold).pipe(
            takeUntil(cancel$),
            switchMap(() =>
              interval(holdInterval).pipe(
                takeWhile((number) => number <= maxEmittedNumber),
                takeUntil(
                  this.es.holdEventState$.pipe(
                    filter((state) => Boolean(this.lastHoldEvent) && state === this.lastHoldEvent),
                    tap(() => this.es.holdEventState$.next('cancel')),
                  ),
                ),
                takeUntil(cancel$),
                tap((num) => {
                  intervalNum = num;
                  this.es.holdEventInterval$.next(num);
                  if (num === 0) {
                    this.es.holdEventState$.next('start');
                  }
                  if (num === 33) {
                    this.es.holdEventState$.next('save');
                  }
                  if (num === 66) {
                    this.es.holdEventState$.next('warning');
                  }
                  if (num === 100) {
                    this.es.holdEventState$.next('cancel');
                  }
                }),
                finalize(() => {
                  if (intervalNum < 66) {
                    this.holdSave.emit();
                  }
                  if (intervalNum >= 66 && intervalNum < 100) {
                    this.holdWarning.emit();
                  }
                  if (intervalNum >= 100) {
                    this.holdDanger.emit();
                  }
                }),
              ),
            ),
          ),
        ),
      )
      .subscribe();

    const touch$ = pointerDown$
      .pipe(
        switchMap(() =>
          pointerUp$.pipe(
            takeUntil(timer(holdThreshold)),
            takeUntil(pointerLeave$),
            tap(() => this.touch.emit()),
          ),
        ),
      )
      .subscribe();

    this.sbs = [hold$, touch$];
  }

  ngOnDestroy(): void {
    this.es.holdEventState$.next('cancel');
    this.sbs.forEach((sb) => sb.unsubscribe());
  }
}
