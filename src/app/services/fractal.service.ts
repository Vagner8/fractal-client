import { Injectable, signal } from '@angular/core';
import { Fractal, FractalFields, ICollectionState } from '@types';
import { ChildrenControlsState, ControlsState, FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $app = signal<Fractal | null>(null);
  $fractalFields = signal<FractalFields | null>(null);

  selectedFractal = new FractalState();
  selectedControls = new ControlsState(this.selectedFractal);
  selectedChildren = new FractalsState(this.selectedFractal);
  selectedChildrenControls = new ChildrenControlsState(this.selectedFractal);

  map = new Map<ICollectionState, ICollectionState>([
    [this.selectedControls, this.selectedControls],
    [this.selectedChildren, this.selectedChildren],
    [this.selectedChildrenControls, this.selectedChildrenControls],
  ]);

  resetOthers = (state: ICollectionState): void => this.map.forEach((s) => s !== state && s.$value.set([]));
}
