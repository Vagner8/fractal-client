import { Control } from '@types';
import { CollectionState } from './collection.state';

export class ChildrenControlsState extends CollectionState<Control> {
  override toggle = (cursor: string): void =>
    this.toggleItem(this.selectedFractalState.value?.findChildrenControl(cursor));

  override toggleAll = (): void =>
    this.$value.update((prev) =>
      prev.length > 0 ? [] : Object.values(this.selectedFractalState.value?.childrenControls ?? []),
    );
}
