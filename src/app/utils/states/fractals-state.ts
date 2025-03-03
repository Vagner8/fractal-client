import { signal } from '@angular/core';
import { Fractal, FractalsState } from '@types';

export class FractalsStateFactory implements FractalsState {
  $value = signal<Fractal[]>([]);

  push(fractal: Fractal): void {
    this.$value.update(prev => [...prev, fractal]);
  }

  clear(): void {
    this.$value.set([]);
  }

  toggle(fractal: Fractal): void {
    this.$value.update(prev => (prev.includes(fractal) ? prev.filter(item => item !== fractal) : [...prev, fractal]));
  }

  refresh(): void {
    this.$value.update(prev => [...prev]);
  }

  toggleAll(fractal: Fractal): void {
    this.$value.update(prev => (prev.length === 0 ? fractal.parent.fractals.values : []));
  }
}
