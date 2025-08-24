import { Control } from '@types';
import { CollectionState } from './collection.state';

export class ControlsState extends CollectionState<Control> {
  override toggle = (cursor: string): void => this.toggleItem(this.fs.selectedFractal.value?.findControl([cursor]));
}
