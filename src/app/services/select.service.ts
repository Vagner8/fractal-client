import { Injectable } from '@angular/core';
import { Fractal } from '@types';
import { FractalSignal, FractalsSignal } from '@utils';

interface SelectServiceSignals {
  $current: FractalSignal;
  $fractals: FractalsSignal;
  $newFractals: FractalsSignal;
  $fractalForm: FractalSignal;
}

@Injectable({
  providedIn: 'root',
})
export class SelectService implements SelectServiceSignals {
  $current = new FractalSignal();
  $fractals = new FractalsSignal();
  $newFractals = new FractalsSignal();
  $fractalForm = new FractalSignal();

  clear(...keys: (keyof SelectServiceSignals)[]): void {
    keys.forEach(key => this[key].clear());
  }

  init({ root, Pages }: { root: Fractal; Pages: string }): void {
    this.$current.set(root.getFractal(Pages));
  }
}
