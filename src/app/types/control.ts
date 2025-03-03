import { WritableSignal } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutableKeys, ConstIndicators } from '@constants';
import { BaseRecord } from './common';

export type Controls = Record<string, Control>;
export type ControlForm = FormRecord<FormControl>;
export type ControlsDto = Record<string, ControlDto>;
export type ControlMutableKeys = keyof typeof ConstControlMutableKeys;

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

export interface ControlsRecord extends BaseRecord<Control> {
  get(indicator: keyof typeof ConstIndicators | { unsaveIndicator: string }): Control | null;
  getDataOf(indicator: keyof typeof ConstIndicators): string;
}

export interface Control {
  dto: ControlDto;
  form: ControlForm;
  $selected: WritableSignal<boolean>;

  get(key: keyof ControlDto): string;
  update(): ControlDto;
  getFormControl(indictor: ControlMutableKeys): FormControl;
  getDataAndSplit(): string[];
}
