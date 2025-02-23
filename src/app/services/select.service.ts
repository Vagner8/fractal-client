import { Injectable } from '@angular/core';
import {
  CurrentFractalState,
  ManagerState,
  ModifiersState,
  SelectedControlsState,
  SelectedFractalsState,
  SelectFractalFromState,
  TapsState,
  EditModeState,
} from '@utils';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  taps = new TapsState();
  manager = new ManagerState();
  editMode = new EditModeState();
  modifiers = new ModifiersState();
  currentFractal = new CurrentFractalState();
  selectedFractals = new SelectedFractalsState();
  selectedControls = new SelectedControlsState();
  selectFractalFrom = new SelectFractalFromState();
}
