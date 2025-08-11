import { Control, Fractal } from '@types';
import { CollectionState } from './collection.state';

export class ControlsState extends CollectionState<Control> {
  override toggleAll = (fractal: Fractal | null): void =>
    this.set(this.isEmpty() ? Object.values(fractal?.controls ?? []) : []);
}
