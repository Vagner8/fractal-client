import { FormControl, FormRecord } from '@angular/forms';
import { AppError, SearchControlData } from './common.types';
import { ConstControlMutableType } from './constants.types';
import { IFractal } from './fractal.types';
import { IBoolState } from './states.types';

export type Controls = Record<string, IControl>;
export type ControlForm = FormRecord<FormControl>;
export type IControlsDto = Record<string, IControlDto>;

export interface IControlMutableDto {
  data: string;
  field: string;
  indicator: string;
}

export interface IControlDto extends IControlMutableDto {
  id: string;
  parentId: string;
}

export interface IControls extends Map<string, IControl> {
  parent: IFractal;
  setOne(control: IControl): [IControl, AppError | null];
  getOne(indicator: SearchControlData): IControl | undefined;
  getOneData(search: SearchControlData): string;
  getOneLikeStrings(search: SearchControlData): string[];
  getOneLikeNumbers(search: SearchControlData): number[];
  getOneAutoCreation(indicator: string): [IControl, boolean];
}

export interface IControl {
  dto: IControlDto;
  form: ControlForm;
  parent?: IFractal;
  fullEditMode: IBoolState;
  get toStrings(): string[];
  get toNumbers(): number[];
  push(data: string): IControl;
  getFromControl(name: ConstControlMutableType): FormControl;
}
