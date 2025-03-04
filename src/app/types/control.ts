import { WritableSignal } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutableKeys, ConstIndicators } from '@constants';
import { BaseRecord } from './common';

export type Controls = Record<string, Control>;
export type ControlForm = FormRecord<FormControl>;
export type ControlsDto = Record<string, ControlDto>;

export interface ControlData {
  value: string;
  get split(): string[];
}

export interface ControlMutableDto {
  data: string;
  input: string;
  indicator: string;
}

export interface ControlDto extends ControlMutableDto {
  id: string;
  parentId: string;
}

export type ControlsRecordGetProps = keyof typeof ConstIndicators | { unknownIndicator: string };

export interface ControlsRecord extends BaseRecord<Control> {
  get(indicator: ControlsRecordGetProps): Control | null;
  getControlData(indicator: ControlsRecordGetProps): string;
  getControlDataAndSplit(indicator: ControlsRecordGetProps): string[];
}

export interface Control {
  dto: ControlDto;
  form: ControlForm;
  $selected: WritableSignal<boolean>;
  update(): ControlDto;
  getFromControl(name: keyof typeof ConstControlMutableKeys): FormControl;
}
