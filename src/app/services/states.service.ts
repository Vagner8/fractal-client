import { Injectable, signal, WritableSignal } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { Fractal, FractalFields, ICollectionState } from '@types';
import { ChildrenControlsState, ControlsState, FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  $app = signal<Fractal | null>(null);
  controlsForms = new FormRecord({});
  selectedFractal = new FractalState();

  selectedChildren = new FractalsState(this);
  selectedControls = new ControlsState(this);
  selectedChildrenControls = new ChildrenControlsState(this);

  $selectedCollectionState: WritableSignal<ICollectionState | null> = signal(null);

  collectionStates: Record<FractalFields, ICollectionState> = {
    children: this.selectedChildren,
    controls: this.selectedControls,
    childrenControls: this.selectedChildrenControls,
  };

  clearCollectionsStates = (): void => Object.values(this.collectionStates).forEach((state) => state.clear());
}
