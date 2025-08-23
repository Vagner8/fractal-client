import { Injectable, signal } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { Fractal, FractalFields, ICollectionState, Modifiers } from '@types';
import { ChildrenControlsState, ControlsState, FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $app = signal<Fractal | null>(null);
  $modifierTouch = signal<Modifiers | null>(null);
  $selectedFractalField = signal<FractalFields | null>(null);

  selectedFractal = new FractalState();

  selectedControls = new ControlsState(this.selectedFractal);
  selectedChildren = new FractalsState(this.selectedFractal);
  selectedChildrenControls = new ChildrenControlsState(this.selectedFractal);

  selectedControlsTest = new ControlsState(this.selectedFractal);

  controlsForms = new FormRecord({});

  map = new Map<ICollectionState, ICollectionState>([
    [this.selectedControls, this.selectedControls],
    [this.selectedChildren, this.selectedChildren],
    [this.selectedChildrenControls, this.selectedChildrenControls],
  ]);

  clearCollectionStates(props?: { exclude?: ICollectionState[] }): void {
    this.map.forEach((state) => {
      if (!props?.exclude?.includes(state)) {
        state.$value.set([]);
      }
    });
  }
}
