import { CONTROL_TYPES } from '@constants';
import { ConstantsValues } from './common.types';
import { Fractal } from './fractal.types';
import { WritableSignal } from '@angular/core';

export type Controls = Record<string, Control>;
export type ControlsDto = Record<string, ControlDto>;
export type ControlType = ConstantsValues<typeof CONTROL_TYPES>;

export interface ControlDto {
  cursor: string;
  parentCursor: string;
  data: string;
  type: ControlType;
}

export interface Control extends ControlDto {
  parent: Fractal;
  $isFullEditMode: WritableSignal<boolean>;
}
