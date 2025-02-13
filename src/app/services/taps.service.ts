import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapsService {
  $taps = signal<Fractal | null>(null);

  set(taps: Fractal | null): void {
    this.$taps.set(taps);
  }
}
