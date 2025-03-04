import { ControlDto, ControlsDto, ControlsRecord } from './control';
import { WritableSignal } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { BaseRecord } from './common';
import { FractalsState, FractalState } from './states';
import { ConstOrder } from '@constants';

export type FractalsDto = Record<string, FractalDto>;

export interface FractalInitOptions {
  syncFormWithDto: boolean;
}

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface FractalsRecord extends BaseRecord<Fractal> {
  getFractalRecursively(test: string, fractals?: FractalsRecord): Fractal | null;
}

export interface Fractal {
  dto: FractalDto;
  form: FormRecord;
  cursor: string;
  parent: Fractal;
  controls: ControlsRecord;
  fractals: FractalsRecord;

  $selected: WritableSignal<boolean>;
  newChildren: FractalsState;
  selectedChild: FractalState;
  selectedChildren: FractalsState;

  is(value: string | object): boolean;
  order(sort: keyof typeof ConstOrder): string[];
  update(): ControlDto[];
  addChildren(): FractalDto[];
  deleteSelectedChildren(): FractalDto[];
  updateSelectedChildren(): ControlDto[];
}
