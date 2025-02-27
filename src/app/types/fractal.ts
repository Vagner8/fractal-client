import { ControlDto, ControlsDto, ControlsRecord } from './control';
import { WritableSignal } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { BaseRecord } from './common';

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

export interface FractalDefaultSort {
  sortChildren: string[];
  sortOwnControls: string[];
  sortChildrenControls: string[];
}

export interface FractalsRecord extends BaseRecord<Fractal> {
  getRecursively(test: string, fractals?: FractalsRecord): Fractal | null;
}

export interface Fractal {
  dto: FractalDto;
  form: FormRecord;
  parent: Fractal;
  controls: ControlsRecord;
  fractals: FractalsRecord;

  $selected: WritableSignal<boolean>;
  $newChildren: WritableSignal<Fractal[]>;
  $selectedChildren: WritableSignal<Fractal[]>;

  get default(): FractalDefaultSort;

  is(value: string | object): boolean;
  update(): ControlDto[];
  addNewChild(): void;
  addChildren(): FractalDto[];
  updateChildrenControls(): ControlDto[];
}
