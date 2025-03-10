import { signal } from '@angular/core';
import { IFractal, IFractalsState } from '@types';

export class FractalsState implements IFractalsState {
  $value = signal<IFractal[]>([]);

  has(fractal: IFractal | null): boolean {
    if (!fractal) return false;
    return this.$value().includes(fractal);
  }

  push(fractal: IFractal): void {
    this.$value.update(prev => [...prev, fractal]);
  }

  clear(): void {
    this.$value.set([]);
  }

  toggle(fractal: IFractal | null): void {
    if (!fractal) return;
    this.$value.update(prev => (prev.includes(fractal) ? prev.filter(item => item !== fractal) : [...prev, fractal]));
  }

  refresh(): void {
    this.$value.update(prev => [...prev]);
  }

  toggleAll(fractal: IFractal | null): void {
    if (!fractal) return;
    this.$value.update(prev => (prev.length === 0 ? Array.from(fractal.parent.fractals.values()) : []));
  }
}
