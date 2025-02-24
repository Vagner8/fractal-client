import { WritableSignal } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';

export type Controls = Record<string, Control>;
export type ControlForm = FormRecord<FormControl>;
export type ControlsDto = Record<string, ControlDto>;
export type Indicators = 'Icon' | 'Cursor' | 'Position';

export interface ControlDto {
  id: string;
  parentId: string;
  data: string;
  input: string;
  indicator: string;
}

export interface Control {
  dto: ControlDto;
  form: ControlForm;
  $selected: WritableSignal<boolean>;
  $formVisible: WritableSignal<boolean>;
}
