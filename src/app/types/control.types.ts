import { Fractal } from './fractal.types';
import { WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export type Controls = Record<string, Control>;
export type ControlsDto = Record<string, ControlDto>;
export type ControlType = 'text' | 'splittable';
export type ControlsStructuralCursors = 'children' | 'controls' | 'control keys' | 'children controls';
export type ControlsCommonCursors = 'name' | 'icon';
export type ControlsCursors = ControlsStructuralCursors | ControlsCommonCursors;
export type ControlFormGroup = FormGroup<Record<keyof ControlDtoMutable, FormControl>>;

export interface ControlDtoMutable {
  data: string;
  type: ControlType;
  cursor: string;
}

export interface ControlDto extends ControlDtoMutable {
  id: string;
  parentCursor: string | null;
}

export interface Control extends ControlDto {
  form: FormGroup | null;
  parent: Fractal | null;
  $isFullEditMode: WritableSignal<boolean>;

  push(data: string): void;
}
