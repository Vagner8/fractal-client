import { FormControl, FormRecord } from '@angular/forms';
import { AppError, IndicatorData } from './common';
import { ConstControlMutableType, ConstIndicatorsType } from './constants';
import { IFractal } from './fractal';

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
  setNew(control: IControl): [IControl, AppError | null];
  getData(indicator: IndicatorData): string;
  getKnown(indicator: ConstIndicatorsType): IControl | undefined;
  getOrCreate(indicator: string): [IControl, boolean];
  getSplitData(indicator: IndicatorData): { strings: string[]; numbers: number[] };
}

export interface IControl {
  dto: IControlDto;
  form: ControlForm;
  parent?: IFractal;
  map<T>(func: (value: string) => T): T[];
  reduce<T>(func: (acc: T, value: string) => T, initialValue: T): T;
  forEach(func: (value: string) => void): void;
  pushSplitData(value: string): IControl;
  getFromControl(name: ConstControlMutableType): FormControl;
  deleteSplitData(data: string): IControl;
}
