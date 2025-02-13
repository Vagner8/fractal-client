import { Injectable, signal } from '@angular/core';
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

  $currentPanel = signal<Fractal | null>(null);

  clear(...keys: (keyof SelectServiceSignals)[]): void {
    keys.forEach(key => this[key].clear());
  }
}
