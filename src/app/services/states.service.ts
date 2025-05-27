import { computed, Injectable, signal } from '@angular/core';
import { ParamMap } from '@angular/router';
import { CAppFractals } from '@constants';
import { ControlsState, FractalsState, FractalState, NewFractalsState } from '@utils';
import { NewControlsState } from 'app/utils/fractal/states/new-controls.state';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  selectedControls = new ControlsState([]);
  selectedSidenavTaps = new FractalState(null);
  selectedFractalForm = new FractalState(null);
  selectedParentFractal = new FractalState(null);
  selectedChildrenFractals = new FractalsState([]);

  newFractals = new NewFractalsState([]);
  dirtySelectedFractals = new FractalsState([]);

  newControls = new NewControlsState([]);
  dirtySelectedControls = new ControlsState([]);

  $paramMap = signal<ParamMap | null>(null);
  $onEditPage = computed<boolean>(() => !!this.$paramMap()?.get(CAppFractals.Modifiers));

  clearSelectedFractals(): void {
    this.newFractals.clear();
    this.selectedFractalForm.clear();
    this.selectedChildrenFractals.clear();
  }
}
