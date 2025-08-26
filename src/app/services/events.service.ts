import { Injectable, signal } from '@angular/core';
import { HoldEvent, HoldEventDelay, Modifiers } from '@types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  $modifierTouch = signal<Modifiers | null>(null);
  $isManagerTouched = signal(false);

  holdEvent$ = new Subject<HoldEvent>();
}
