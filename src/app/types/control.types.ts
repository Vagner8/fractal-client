import { Fractal } from './fractal.types';
import { WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export type Controls = Record<string, Control>;
export type ControlsDto = Record<string, ControlDto>;
export type ControlType = 'String' | 'Splittable';
export type ControlsStructuralCursors = 'children' | 'controls' | 'control keys' | 'children controls';
export type ControlsCommonCursors = 'Name' | 'Icon';
export type ControlsCursors = ControlsStructuralCursors | ControlsCommonCursors;

export interface ControlDtoMutable {
  data: string;
  type: ControlType;
  cursor: string;
}

export interface ControlDto extends ControlDtoMutable {
  id: string;
  parentCursor: string;
}

export interface Control extends ControlDto {
  form: FormGroup | null;
  parent: Fractal;
  $isFullEditMode: WritableSignal<boolean>;
}
