import { Injectable, signal } from '@angular/core';
import { ParamMap } from '@angular/router';
import { ControlsState, FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  sidenavTaps = new FractalState(null);
  selectedForm = new FractalState(null);
  currentFractal = new FractalState(null);

  selectedChildren = new FractalsState([]);
  selectedControls = new ControlsState([]);

  $paramMap = signal<ParamMap | null>(null);

  markSelectedFractalsPristine(): void {
    this.currentFractal.$value()?.fullEditMode.clear();
    this.selectedChildren.forEach(fractal => fractal.fullEditMode.clear());
    this.selectedForm.clear();
    this.selectedChildren.clear();
  }
}
