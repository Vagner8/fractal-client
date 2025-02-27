import { Injectable, signal } from '@angular/core';
import { ConstAppFractals } from '@constants';
import { Fractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $app = signal<Fractal | null>(null);
  modifiers: Fractal | null = null;
  collections: Fractal | null = null;

  init(app: Fractal): void {
    this.modifiers = app.fractals.getRecursively(ConstAppFractals.Modifiers);
    this.collections = app.fractals.getRecursively(ConstAppFractals.Collections);
    this.$app.set(app);
  }
}
