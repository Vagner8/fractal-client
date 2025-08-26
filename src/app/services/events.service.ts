import { Injectable, signal } from '@angular/core';
import { Modifiers } from '@types';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  $modifierTouch = signal<Modifiers | null>(null);
  $isManagerTouched = signal(false);
}
