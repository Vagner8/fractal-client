import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutableKeys, ConstIndicators } from '@constants';
import { IAppMap, IndicatorData } from './common';

export type Controls = Record<string, IControl>;
export type ControlForm = FormRecord<FormControl>;
export type IControlsDto = Record<string, IControlDto>;

export interface IControlMutableDto {
  data: string;
  input: string;
  indicator: string;
}

export interface IControlDto extends IControlMutableDto {
  id: string;
  parentId: string;
}

export interface IControlMap extends IAppMap<IControl> {
  getKnown(indicator: keyof typeof ConstIndicators): IControl | undefined;
  getControlData(indicator: IndicatorData): string;
  getControlDataAndSplit(indicator: IndicatorData): string[];
}

export interface IControl {
  dto: IControlDto;
  form: ControlForm;
  syncWithForm(): IControlDto;
  getFromControl(name: keyof typeof ConstControlMutableKeys): FormControl;
  updateSplitData(value: string): IControl;
}
