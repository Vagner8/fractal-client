import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapsService {
  $taps = signal<Fractal | null>(null);

  async set(taps: Fractal | null): Promise<void> {
    this.$taps.set(taps);
  }
}
