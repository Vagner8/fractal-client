import { WritableSignal } from '@angular/core';
import { Fractal } from './fractal.types';
import { FormControl, FormGroup } from '@angular/forms';

export type Controls = Record<string, Control>;
export type ControlsDto = Record<string, ControlDto>;

export type ControlFormGroup = FormGroup<Record<keyof ControlDtoMutable, FormControl>>;
export type ControlLike = 'data' | 'edit';

export type ControlPublicTypes = 'string' | 'select';
export type ControlPrivateTypes = `private:${ControlPublicTypes}`;
export type ControlReadonlyTypes = `readonly:${ControlPublicTypes}`;
export type ControlTypes = ControlPublicTypes | ControlPrivateTypes | ControlReadonlyTypes;

export type ControlsStructuralCursors = 'children' | 'controls' | 'control keys' | 'children controls';
export type ControlsCommonCursors = 'name' | 'icon';
export type ControlsCursors = ControlsStructuralCursors | ControlsCommonCursors;

export interface ControlDtoMutable {
  data: string;
  type: ControlTypes;
  cursor: string;
}

export interface ControlDto extends ControlDtoMutable {
  id: string;
  parentCursor: string | null;
}

export interface Control extends ControlDto {
  parent: Fractal | null;
  $like: WritableSignal<ControlLike>;
  push(data: string): void;
}
