import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  $event = signal<string | null>(null);

  set(event: string | null): void {
    this.$event.set(event);
  }
}
