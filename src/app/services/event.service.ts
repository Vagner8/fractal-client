import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  $managerEvent = signal<string | null>(null);
  $isHoldEventRunning = signal(false);
}
