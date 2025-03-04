import { signal } from '@angular/core';
import { Fractal, FractalsState } from '@types';

export class FractalsStateFactory implements FractalsState {
  $value = signal<Fractal[]>([]);

  has(fractal: Fractal | null): boolean {
    if (!fractal) return false;
    return this.$value().includes(fractal);
  }

  push(fractal: Fractal): void {
    this.$value.update(prev => [...prev, fractal]);
  }

  clear(): void {
    this.$value.set([]);
  }

  toggle(fractal: Fractal | null): void {
    if (!fractal) return;
    this.$value.update(prev => (prev.includes(fractal) ? prev.filter(item => item !== fractal) : [...prev, fractal]));
  }

  refresh(): void {
    this.$value.update(prev => [...prev]);
  }

  toggleAll(fractal: Fractal | null): void {
    if (!fractal) return;
    this.$value.update(prev => (prev.length === 0 ? fractal.parent.fractals.values : []));
  }
}
