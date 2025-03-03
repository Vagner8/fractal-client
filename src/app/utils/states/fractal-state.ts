import { signal } from '@angular/core';
import { Fractal, FractalState } from '@types';

export class FractalStateFactory implements FractalState {
  $value = signal<Fractal | null>(null);

  set(fractal: Fractal | null): void {
    this.$value.set(fractal);
  }

  toggle(fractal: Fractal): void {
    this.$value.update(prev => (prev === fractal ? null : fractal));
  }

  refresh(): void {
    const prev = this.$value();
    this.$value.set(null);
    this.$value.set(prev);
  }
}
