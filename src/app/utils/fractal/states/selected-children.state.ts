import { ISelectedChildrenState } from '@types';
import { FractalsState } from './fractals.state';
import { CWords } from '@constants';

export class SelectedChildrenState extends FractalsState implements ISelectedChildrenState {
  retainNewChildren(): void {
    this.set(this.value.filter(fractal => fractal.cursor === CWords.New));
  }
}
