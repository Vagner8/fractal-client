import { Fractal } from '@types';
import { CollectionState } from './collection.state';

export class FractalsState extends CollectionState<Fractal> {
  override toggle = (cursor: string): void => this.toggleItem(this.fs.selectedFractal.value?.findChild([cursor]));
}
