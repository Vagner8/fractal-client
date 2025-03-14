import { Injectable } from '@angular/core';
import { FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  sidenavTaps = new FractalState();
  currentFractal = new FractalState();

  newChildren = new FractalsState();
  selectedChildren = new FractalsState();
  selectedChildrenForms = new FractalsState();
}
