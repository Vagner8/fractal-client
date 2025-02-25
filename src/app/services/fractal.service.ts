import { Injectable, signal } from '@angular/core';
import { ConstAppFractals } from '@constants';
import { FractalCollection } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $app = signal<FractalCollection | null>(null);
  modifiers: FractalCollection | null = null;
  collections: FractalCollection | null = null;

  init(app: FractalCollection): void {
    this.modifiers = app.fractals.getCollection(ConstAppFractals.Modifiers);
    this.collections = app.fractals.getCollection(ConstAppFractals.Collections);
    this.$app.set(app);
  }
}
