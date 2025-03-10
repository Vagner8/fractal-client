import { FormControl, FormRecord } from '@angular/forms';
import { IndicatorData } from './common';
import { ConstControlMutableType, ConstIndicatorsType } from './constants';
import { Control } from '@utils';

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

export interface IControls extends Map<string, Control> {
  getKnown(indicator: ConstIndicatorsType): IControl | undefined;
  getControlData(indicator: IndicatorData): string;
  getAndSplitControlData(indicator: IndicatorData): string[];
}

export interface IControl {
  dto: IControlDto;
  form: ControlForm;
  syncWithForm(): IControlDto;
  pushSplitData(value: string): IControl;
  getFromControl(name: ConstControlMutableType): FormControl;
  deleteSplitData(data: string): IControl;
}
