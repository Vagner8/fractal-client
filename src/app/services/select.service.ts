import { Injectable } from '@angular/core';
import { ControlDto, Fractal } from '@types';
import { ArrayState, FractalState, FractalsState } from '@utils';

interface SelectServiceSignals {
  $newFractals: ArrayState<Fractal>;
  $newControls: ArrayState<ControlDto>;
  $touchedControls: ArrayState<ControlDto>;

  $currentPanel: FractalState;
  $currentFractal: FractalState;
  $selectedFractals: FractalsState;
}

@Injectable({
  providedIn: 'root',
})
export class SelectService implements SelectServiceSignals {
  $newFractals = new ArrayState([]);
  $newControls = new ArrayState([]);
  $touchedControls = new ArrayState([]);

  $currentPanel = new FractalState(null);
  $currentFractal = new FractalState(null);

  $selectedFractals = new FractalsState([]);

  clear(...keys: (keyof SelectServiceSignals)[]): void {
    keys.forEach(key => this[key].clear());
  }

  setCurrentFractals(fractal: Fractal | null): void {
    this.$currentFractal.set(fractal);
    this.$selectedFractals.set(fractal ? [fractal] : []);
  }

  setCurrentPanel(fractal: Fractal | null): void {
    this.$currentPanel.set(fractal);
    this.$selectedFractals.set(fractal ? [fractal] : []);
  }
}
