import { Injectable, signal } from '@angular/core';
import { ParamMap } from '@angular/router';
import { ControlsState, FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  sidenavTaps = new FractalState(null);
  currentFractal = new FractalState(null);

  newChildren = new FractalsState([]);
  selectedForms = new FractalsState([]);
  selectedControls = new ControlsState([]);
  selectedChildren = new FractalsState([]);

  $paramMap = signal<ParamMap | null>(null);
  $fullEditMode = signal(false);

  clearAll(): void {
    this.newChildren.clear();
    this.selectedForms.clear();
    this.selectedChildren.clear();
  }
}
