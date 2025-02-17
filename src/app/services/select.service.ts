import { Injectable } from '@angular/core';
import {
  CurrentFormState,
  CurrentFractalState,
  ManagerState,
  ModifiersState,
  SelectedFractalsState,
  TapsState,
} from '@utils';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  taps = new TapsState();
  manager = new ManagerState();
  modifiers = new ModifiersState();
  currentForm = new CurrentFormState();
  currentFractal = new CurrentFractalState();
  selectedFractals = new SelectedFractalsState();
}
