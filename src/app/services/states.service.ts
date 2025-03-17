import { Injectable, signal } from '@angular/core';
import { ControlsState, FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  sidenavTaps = new FractalState(null);
  selectedForm = new FractalState(null);
  currentFractal = new FractalState(null);

  newChildren = new FractalsState([]);
  selectedControls = new ControlsState([]);
  selectedChildren = new FractalsState([]);

  $fullEditMode = signal(false);
}
