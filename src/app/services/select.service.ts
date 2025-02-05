import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  $new = signal<Fractal[]>([]);
  $items = signal<Fractal[]>([]);
  $current = signal<Fractal | null>(null);

  get areItems(): boolean {
    return this.$items().length > 0;
  }

  get isCurrent(): boolean {
    return this.$current() !== null;
  }

  setCurrent(fractal: Fractal | null): void {
    this.$current.set(fractal);
  }

  setNew(fractal: Fractal): void {
    this.$new.update(prevFractals => [...prevFractals, fractal]);
  }

  setItem(fractal: Fractal): void {
    this.$items.update(prevFractals =>
      prevFractals.includes(fractal)
        ? prevFractals.filter(prevFractal => prevFractal !== fractal)
        : [...prevFractals, fractal]
    );
  }

  selectItems(fractal: Fractal): void {
    this.$items.update(prevFractals => (prevFractals.length > 0 ? [] : fractal.parent.children));
  }

  clear(): void {
    this.$new.set([]);
    this.$items.set([]);
  }

  init({ root, Pages }: { root: Fractal; Pages: string }): void {
    this.$current.set(root.getFractal(Pages));
  }
}
