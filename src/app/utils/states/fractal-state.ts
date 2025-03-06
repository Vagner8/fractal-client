import { signal } from '@angular/core';
import { IFractal, IFractalState } from '@types';

export class FractalState implements IFractalState {
  $value = signal<IFractal | null>(null);

  set(fractal: IFractal | null): void {
    this.$value.set(fractal);
  }

  toggle(fractal: IFractal): void {
    this.$value.update(prev => (prev === fractal ? null : fractal));
  }

  refresh(): void {
    const prev = this.$value();
    this.$value.set(null);
    this.$value.set(prev);
  }
}
