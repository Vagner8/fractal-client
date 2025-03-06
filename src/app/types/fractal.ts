import { ControlDto, ControlsDto, IControlMap } from './control';
import { WritableSignal } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { IFractalsState, IFractalState } from './states';
import { ConstOrder } from '@constants';
import { IAppMap } from './common';

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

export interface IFractalMap extends IAppMap<IFractal> {
  getRecursively(test: string, fractals?: IFractalMap): IFractal | null;
}

export interface IFractal {
  dto: FractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControlMap;
  fractals: IFractalMap;

  $selected: WritableSignal<boolean>;
  newChildren: IFractalsState;
  selectedChild: IFractalState;
  selectedChildren: IFractalsState;

  is(value: string | object): boolean;
  order(sort: keyof typeof ConstOrder): string[];
  update(): ControlDto[];
  addChildren(): FractalDto[];
  deleteSelectedChildren(): FractalDto[];
  updateSelectedChildren(): ControlDto[];
}
