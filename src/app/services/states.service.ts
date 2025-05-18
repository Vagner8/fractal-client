import { computed, Injectable, signal } from '@angular/core';
import { ParamMap } from '@angular/router';
import { CAppFractals } from '@constants';
import { ControlsState, FractalState, SelectedChildrenState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  modifier = new FractalState(null);
  sidenavTaps = new FractalState(null);
  selectedForm = new FractalState(null);
  currentFractal = new FractalState(null);

  selectedChildren = new SelectedChildrenState([]);
  selectedControls = new ControlsState([]);

  $paramMap = signal<ParamMap | null>(null);
  $editPageActivated = computed<boolean>(() => !!this.$paramMap()?.get(CAppFractals.Modifiers));

  markSelectedFractalsPristine(): void {
    this.selectedForm.clear();
    this.selectedChildren.clear();
  }
}
