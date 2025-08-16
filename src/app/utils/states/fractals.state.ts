import { Fractal } from '@types';
import { CollectionState } from './collection.state';

export class FractalsState extends CollectionState<Fractal> {
  override toggle = (cursor: string): void => this.toggleItem(this.selectedFractalState.value?.findChild([cursor]));

  override toggleAll = (): void =>
    this.$value.update((prev) =>
      prev.length > 0 ? [] : Object.values(this.selectedFractalState.value?.children ?? []),
    );
}
