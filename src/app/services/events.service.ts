import { Injectable, signal } from '@angular/core';
import { HoldEventState, Modifiers } from '@types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  $modifierTouch = signal<Modifiers | null>(null);
  $drawerOpened = signal(false);

  holdEventState$ = new Subject<HoldEventState>();
  holdEventInterval$ = new Subject<number>();
}
