import { WritableSignal } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutableKeys, ConstIndicators } from '@constants';
import { IAppMap } from './common';

export type Controls = Record<string, IControl>;
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

export interface IControlMap extends IAppMap<IControl> {
  getControlData(indicator: keyof typeof ConstIndicators | string[]): string;
  getControlDataAndSplit(indicator: keyof typeof ConstIndicators | string[]): string[];
}

export interface IControl {
  dto: ControlDto;
  form: ControlForm;
  $selected: WritableSignal<boolean>;
  update(): ControlDto;
  getFromControl(name: keyof typeof ConstControlMutableKeys): FormControl;
}
