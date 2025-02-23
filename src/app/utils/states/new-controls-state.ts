import { Control } from '@types';
import { ArrayState } from './abstract/array-state';

export class NewControlsState extends ArrayState<Control> {
  constructor() {
    super([]);
  }
}
