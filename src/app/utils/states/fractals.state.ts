import { computed, signal } from '@angular/core';
import { Fractal } from '@types';

export class FractalsState {
  value: Fractal[] = [];
  $value = signal<Fractal[]>([]);

  $isEmpty = computed<boolean>(() => this.$value().length === 0);

  push = (fractal: Fractal): void => this.set([...this.value, fractal]);
  delete = (fractal: Fractal): void => this.set(this.value.filter(prevItem => prevItem !== fractal));
  isEmpty = (): boolean => this.value.length === 0;

  deleteBunch = (fractals: Fractal[]): void => this.set(this.value.filter(fractal => !fractals.includes(fractal)));

  toggle = (fractal: Fractal): void => (this.value.includes(fractal) ? this.delete(fractal) : this.push(fractal));
  toggleAll = (fractal: Fractal): void => this.set(this.isEmpty() ? Object.values(fractal.parent.children ?? {}) : []);

  set = (fractals: Fractal[]): void => {
    this.value = fractals;
    this.$value.set(fractals);
  };
}
