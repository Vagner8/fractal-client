import { IFractal, IFractalDto, FractalInitOptions, IControls, IFractals } from '@types';
import { FormRecord } from '@angular/forms';
import { ConstAppFractals } from '@constants';
import { Controls } from './maps/controls';
import { Fractals } from './maps/fractals';
import { signal, WritableSignal } from '@angular/core';

export class Fractal implements IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControls;
  fractals: IFractals;
  isCollection: boolean;

  $fullEditMode: WritableSignal<boolean>;

  constructor(dto: IFractalDto, parent?: IFractal | null, options?: FractalInitOptions) {
    this.dto = dto;
    this.form = new FormRecord({});
    this.parent = parent ? parent : ({} as IFractal);
    this.controls = new Controls(this, options);
    this.fractals = new Fractals(dto.fractals, this);
    this.cursor = this.controls.getControlData('Cursor');
    this.isCollection = parent?.cursor === ConstAppFractals.Collections;

    this.$fullEditMode = signal(false);
  }

  get ancestors(): IFractal[] {
    const ancestors: IFractal[] = [];
    for (let current = this.parent; current; current = current.parent) ancestors.push(current);
    return ancestors;
  }
}
