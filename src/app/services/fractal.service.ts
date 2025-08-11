import { effect, Injectable, signal } from '@angular/core';
import { Fractal } from '@types';
import { ControlsState, FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $app = signal<Fractal | null>(null);
  selectedFractal = new FractalState();
  selectedControls = new ControlsState();
  selectedChildren = new FractalsState();

  constructor() {
    effect(() => {
      this.selectedFractal.$value();
      this.selectedControls.set([]);
    });
  }
}
