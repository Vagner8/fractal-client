import { Injectable } from '@angular/core';
import {
  SelectedFractalFormState,
  CurrentFractalState,
  ManagerState,
  ModifiersState,
  SelectedFractalsState,
  TapsState,
} from '@utils';
import { SelectedControlsFormsState } from 'app/utils/states/selected-controls-forms-state';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  taps = new TapsState();
  manager = new ManagerState();
  modifiers = new ModifiersState();
  currentFractal = new CurrentFractalState();
  selectedFractals = new SelectedFractalsState();
  selectedFractalForm = new SelectedFractalFormState();
  selectedControlsForms = new SelectedControlsFormsState();
}
