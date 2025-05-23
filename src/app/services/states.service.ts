import { computed, effect, Injectable, signal } from '@angular/core';
import { ParamMap } from '@angular/router';
import { CAppFractals } from '@constants';
import { ControlsState, FractalsState, FractalState, NewFractalsState } from '@utils';

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

  dirtyFractals = new FractalsState([]);
  dirtyControls = new ControlsState([]);

  $paramMap = signal<ParamMap | null>(null);
  $onEditPage = computed<boolean>(() => !!this.$paramMap()?.get(CAppFractals.Modifiers));

  constructor() {
    effect(() => {
      this.newFractals.selectedParentFractal = this.selectedParentFractal.$value();
    });
  }

  clearSelectedFractals(): void {
    this.newFractals.clear();
    this.selectedFractalForm.clear();
    this.selectedChildrenFractals.clear();
  }
}
