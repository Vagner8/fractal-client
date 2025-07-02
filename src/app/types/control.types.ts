import { CONTROL_TYPES } from '@constants';
import { ConstantsValues } from './common.types';
import { Fractal } from './fractal.types';
import { WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export type Controls = Record<string, Control>;
export type ControlsDto = Record<string, ControlDto>;
export type ControlType = ConstantsValues<typeof CONTROL_TYPES>;

export interface ControlDtoMutable {
  cursor: string;
  data: string;
  type: ControlType;
}

export interface ControlDto extends ControlDtoMutable {
  parentCursor: string;
}

export interface Control extends ControlDto {
  form?: FormGroup;
  parent: Fractal;
  $isFullEditMode: WritableSignal<boolean>;
}
