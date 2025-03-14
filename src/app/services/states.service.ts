import { Injectable, signal } from '@angular/core';
import { FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  sidenavTaps = new FractalState(null);
  currentFractal = new FractalState(null);

  newChildren = new FractalsState([]);
  selectedChildren = new FractalsState([]);
  selectedChildrenForms = new FractalsState([]);

  $fullEditMode = signal(false);
}
