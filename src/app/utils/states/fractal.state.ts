import { effect, signal } from '@angular/core';
import { Fractal } from '@types';

export class FractalState {
  value: Fractal | null = null;
  $value = signal<Fractal | null>(null);

  constructor() {
    effect(() => {
      this.value = this.$value();
    });
  }

  reset = (): void => {
    const prev = this.value;
    this.$value.set(null);
    this.$value.set(prev);
  };
}
