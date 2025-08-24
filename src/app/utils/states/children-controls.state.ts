import { Control } from '@types';
import { CollectionState } from './collection.state';

export class ChildrenControlsState extends CollectionState<Control> {
  override toggle = (cursor: string): void =>
    this.toggleItem(this.fs.selectedFractal.value?.findChildrenControl(cursor));
}
