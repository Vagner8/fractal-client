import { ControlForm, Fractal } from '@types';
import { ArrayState } from './abstract/array-state';

class State extends ArrayState<ControlForm> {
  constructor() {
    super([]);
  }
}

export class SelectedControlsFormsState {
  map: Map<Fractal, ArrayState<ControlForm>>;

  constructor() {
    this.map = new Map();
  }

  set(fractal: Fractal): void {
    this.map.set(fractal, new State());
  }
}
