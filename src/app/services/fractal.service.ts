import { Injectable, signal, WritableSignal } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { Fractal, FractalFields, ICollectionState, Modifiers } from '@types';
import { ChildrenControlsState, ControlsState, FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $app = signal<Fractal | null>(null);
  $modifierTouch = signal<Modifiers | null>(null);
  $selectedCollectionState: WritableSignal<ICollectionState>;

  selectedFractal = new FractalState();

  selectedChildren = new FractalsState(this);
  selectedControls = new ControlsState(this);
  selectedChildrenControls = new ChildrenControlsState(this);

  collectionStates: Record<FractalFields, ICollectionState> = {
    children: this.selectedChildren,
    controls: this.selectedControls,
    childrenControls: this.selectedChildrenControls,
  };

  controlsForms = new FormRecord({});

  constructor() {
    this.$selectedCollectionState = signal(this.selectedChildren);
  }

  clearCollectionsStates = (): void =>
    Object.values(this.collectionStates).forEach((state) => {
      state.clear();
    });
}
