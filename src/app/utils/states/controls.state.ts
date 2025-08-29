import { Control } from '@types';
import { CollectionState } from './collection.state';
export class ControlsState extends CollectionState<Control> {
  override toggle = (cursor: string): void => this.toggleItem(this.ss.selectedFractal.value?.findControl([cursor]));
  override toggleAll = (): void => this.toggleAllItems(this.ss.selectedFractal.value?.controls);
}
