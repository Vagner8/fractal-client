import { computed, signal } from '@angular/core';
import { Fractal } from '@types';

export class FractalsState {
  value: Fractal[] = [];
  $value = signal<Fractal[]>([]);
  $cursors = signal<string[]>([]);

  $isEmpty = computed<boolean>(() => this.$value().length === 0);

  has = (fractal: Fractal | null): boolean => this.value.some((f) => f === fractal);
  push = (fractal: Fractal): void => this.set([...this.value, fractal]);
  delete = (fractal: Fractal | null): void => this.set(this.value.filter((prevItem) => prevItem !== fractal));
  isEmpty = (): boolean => this.value.length === 0;
  deleteBunch = (fractals: Fractal[]): void => this.set(this.value.filter((fractal) => !fractals.includes(fractal)));

  toggle(fractal: Fractal | null): void {
    if (fractal) {
      if (this.has(fractal)) {
        this.delete(fractal);
      } else {
        this.push(fractal);
      }
    }
  }

  toggleAll = (fractal: Fractal | null): void =>
    this.set(this.isEmpty() ? Object.values(fractal?.parent?.children ?? {}) : []);

  set = (fractals: Fractal[]): void => {
    this.value = fractals;
    this.$value.set(fractals);
    this.$cursors.set(fractals.map(({ cursor }) => cursor));
  };
}
