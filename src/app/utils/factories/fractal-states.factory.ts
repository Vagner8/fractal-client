import { IControlsState, IFractalsState, IFractalState, IFractalSetStates, IFractal } from '@types';
import { ControlsState, FractalsState, FractalState } from '../states';

export class FractalStates implements IFractalSetStates {
  selectedForm: IFractalState = new FractalState(null);

  newControls: IControlsState = new ControlsState([]);
  dirtyControls: IControlsState = new ControlsState([]);
  selectedControls: IControlsState = new ControlsState([]);

  newChildren: IFractalsState = new FractalsState([]);
  selectedChildren: IFractalsState = new FractalsState([]);
  selectedChildrenForms: IFractalsState = new FractalsState([]);

  constructor(private readonly fractal: IFractal) {}

  toggleAllSelectedChildren(): void {
    this.selectedChildren.set(this.selectedChildren.isEmpty ? Array.from(this.fractal.fractals.values()) : []);
  }
}
