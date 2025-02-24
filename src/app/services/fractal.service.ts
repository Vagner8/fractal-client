import { Injectable, signal } from '@angular/core';
import { ConstEntities } from '@constants';
import { CollectionFractal } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $app = signal<CollectionFractal | null>(null);
  modifiers: CollectionFractal | null = null;
  collections: CollectionFractal | null = null;

  init(app: CollectionFractal): void {
    this.modifiers = app.fractals.getCollection(ConstEntities.Modifiers);
    this.collections = app.fractals.getCollection(ConstEntities.Collections);
    this.$app.set(app);
  }
}
