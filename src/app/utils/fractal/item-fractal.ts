import { AbstractFractal } from './abstract-fractal';
import { CollectionFractal } from './collection-fractal';

export class ItemFractal extends AbstractFractal {
  override parent!: CollectionFractal;
}
