import { Injectable } from '@angular/core';
import { Fractal } from '@types';
import { FractalSignal, FractalsSignal } from '@utils';

interface SelectServiceSignals {
  $new: FractalsSignal;
  $current: FractalSignal;
  $selected: FractalsSignal;
}

@Injectable({
  providedIn: 'root',
})
export class SelectService implements SelectServiceSignals {
  $new = new FractalsSignal();
  $current = new FractalSignal();
  $selected = new FractalsSignal();

  clear(...keys: (keyof SelectServiceSignals)[]): void {
    keys.forEach(key => this[key].clear());
  }

  init({ root, Pages }: { root: Fractal; Pages: string }): void {
    this.$current.set(root.getFractal(Pages));
  }
}
