import { Control } from '@types';
import { CollectionState } from './collection.state';

export class ControlsState extends CollectionState<Control> {
  override toggle = (cursor: string): void => this.toggleItem(this.selectedFractalState.value?.findControl([cursor]));

  override toggleAll = (): void =>
    this.$value.update((prev) => {
      return prev.length > 0 ? [] : Object.values(this.selectedFractalState.value?.controls ?? []);
    });
}
