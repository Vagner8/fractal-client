import { Injectable } from '@angular/core';
import { Fractal } from '@types';
import { FractalState, FractalsState } from '@utils';

interface SelectServiceSignals {
  $new: FractalsState;
  $current: FractalState;
  $selected: FractalsState;
}

@Injectable({
  providedIn: 'root',
})
export class SelectService implements SelectServiceSignals {
  $new = new FractalsState();
  $current = new FractalState();
  $selected = new FractalsState();

  clear(...keys: (keyof SelectServiceSignals)[]): void {
    keys.forEach(key => this[key].clear());
  }

  init({ root, Pages }: { root: Fractal; Pages: string }): void {
    this.$current.set(root.getFractal(Pages));
  }
}
