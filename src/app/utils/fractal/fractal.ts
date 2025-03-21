import { IFractal, IFractalDto, FractalInitOptions, IControls, IFractals, IBoolState, IControlsState } from '@types';
import { FormRecord } from '@angular/forms';
import { ConstAppFractals } from '@constants';
import { Controls } from './maps/controls';
import { Fractals } from './maps/fractals';
import { BoolState, ControlsState } from './states';

export class Fractal implements IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControls;
  fractals: IFractals;
  isCollection: boolean;

  newControls: IControlsState;
  fullEditMode: IBoolState;

  constructor(dto: IFractalDto, parent?: IFractal | null, options?: FractalInitOptions) {
    this.dto = dto;
    this.form = new FormRecord({});
    this.parent = parent || ({} as IFractal);
    this.controls = new Controls(this, options);
    this.fractals = new Fractals(dto.fractals, this);
    this.cursor = this.controls.getControlData('Cursor');
    this.isCollection = parent?.cursor === ConstAppFractals.Collections;

    this.newControls = new ControlsState([]);
    this.fullEditMode = new BoolState(false);
  }

  get isNew(): boolean {
    return !this.cursor;
  }

  get ancestors(): IFractal[] {
    const ancestors: IFractal[] = [];
    for (let current = this.parent; current; current = current.parent) ancestors.push(current);
    return ancestors;
  }
}
