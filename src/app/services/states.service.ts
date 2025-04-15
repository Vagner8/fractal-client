import { computed, Injectable, signal } from '@angular/core';
import { ParamMap } from '@angular/router';
import { ConstAppFractals } from '@constants';
import { ControlsState, FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  sidenavTaps = new FractalState(null);
  selectedForm = new FractalState(null);
  currentFractal = new FractalState(null);

  selectedChildren = new FractalsState([]);
  selectedControls = new ControlsState([]);

  $paramMap = signal<ParamMap | null>(null);
  $editPageActivated = computed<boolean>(() => !!this.$paramMap()?.get(ConstAppFractals.Modifiers));

  markSelectedFractalsPristine(): void {
    this.currentFractal.$value()?.fullEditMode.clear();
    this.selectedChildren.forEach(fractal => fractal.fullEditMode.clear());
    this.selectedForm.clear();
    this.selectedChildren.clear();
  }
}
