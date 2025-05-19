import { ISelectedChildrenState } from '@types';
import { FractalsState } from './fractals.state';
import { CWords } from '@constants';
import { ControlsState } from './controls.state';

export class SelectedChildrenState extends FractalsState implements ISelectedChildrenState {
  dirtyFractals = new FractalsState([]);
  dirtyControls = new ControlsState([]);

  override clear(): void {
    super.clear();
    this.dirtyFractals.clear();
  }

  retainNewChildren(): void {
    this.set(this.value.filter(fractal => fractal.cursor === CWords.New));
  }
}
