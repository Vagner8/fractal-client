import { Injectable, signal, WritableSignal } from '@angular/core';
import { Fractal } from '@types';

interface SelectServiceSignals {
  $current: WritableSignal<Fractal | null>;
  $fractals: WritableSignal<Fractal[]>;
  $newFractals: WritableSignal<Fractal[]>;
  $fractalForm: WritableSignal<Fractal | null>;
}

@Injectable({
  providedIn: 'root',
})
export class SelectService implements SelectServiceSignals {
  $current = signal<Fractal | null>(null);
  $fractals = signal<Fractal[]>([]);
  $newFractals = signal<Fractal[]>([]);
  $fractalForm = signal<Fractal | null>(null);

  get isCurrent(): boolean {
    return this.$current() !== null;
  }

  get areFractals(): boolean {
    return this.$fractals().length > 0;
  }

  setCurrent(fractal: Fractal | null): void {
    this.$current.set(fractal);
  }

  setFractal(fractal: Fractal): void {
    this.$fractals.update(prevFractals =>
      prevFractals.includes(fractal)
        ? prevFractals.filter(prevFractal => prevFractal !== fractal)
        : [...prevFractals, fractal]
    );
  }

  deleteFractal(item: Fractal): void {
    this.$fractals.update(prevItems => prevItems.filter(prevItem => prevItem !== item));
  }

  setNewFractal(fractal: Fractal): void {
    this.$newFractals.update(prevFractals => [...prevFractals, fractal]);
  }

  setFractalForm(fractal: Fractal): void {
    this.$fractalForm.set(fractal);
  }

  selectAllFractals(fractal: Fractal): void {
    this.$fractals.update(prevFractals => (prevFractals.length > 0 ? [] : fractal.parent.children));
  }

  clear(keys: (keyof SelectServiceSignals)[]): void {
    const isArray = (signal: WritableSignal<(Fractal | null) | Fractal[]>): signal is WritableSignal<Fractal[]> =>
      Array.isArray(signal());
    keys.forEach(key => {
      const signal = this[key];
      if (isArray(signal)) {
        signal.set([]);
      } else {
        signal.set(null);
      }
    });
  }

  init({ root, Pages }: { root: Fractal; Pages: string }): void {
    this.$current.set(root.getFractal(Pages));
  }
}
