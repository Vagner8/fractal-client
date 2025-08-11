import { Fractal } from '@types';
import { CollectionState } from './collection.state';

export class FractalsState extends CollectionState<Fractal> {
  override toggleAll = (fractal: Fractal | null): void =>
    this.set(this.isEmpty() ? Object.values(fractal?.children ?? {}) : []);
}
