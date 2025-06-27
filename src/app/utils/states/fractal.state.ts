import { signal } from '@angular/core';
import { Fractal } from '@types';

export class FractalState {
  value: Fractal | null = null;
  $value = signal<Fractal | null>(null);

  set = (fractals: Fractal): void => {
    this.value = fractals;
    this.$value.set(fractals);
  };
}
