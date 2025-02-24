import { Injectable, signal } from '@angular/core';
import { ConstEntities } from '@constants';
import { FractalCollection } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $app = signal<FractalCollection | null>(null);
  modifiers: FractalCollection | null = null;
  collections: FractalCollection | null = null;

  init(app: FractalCollection): void {
    this.modifiers = app.fractals.getCollection(ConstEntities.Modifiers);
    this.collections = app.fractals.getCollection(ConstEntities.Collections);
    this.$app.set(app);
  }
}
