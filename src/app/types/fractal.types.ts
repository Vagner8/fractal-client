import { WritableSignal } from '@angular/core';
import { Control, Controls, ControlsDto } from './control.types';
import { SearchControlsProp, SearchFractalsProp } from './helpers.types';

export type Children = Record<string, Fractal>;
export type ChildrenDto = Record<string, FractalDto>;

export interface FractalDto {
  cursor: string;
  parentCursor: string;

  controls?: ControlsDto;
  children?: ChildrenDto;
}

export interface Fractal extends FractalDto {
  parent: Fractal;
  children?: Children;
  controls?: Controls;

  $newControls: WritableSignal<Control[]>;

  is(search: SearchFractalsProp): boolean;

  findChild(search: SearchFractalsProp): Fractal | null;
  findChildRecursively(search: SearchFractalsProp): Fractal | null;

  findControl(search: SearchControlsProp): Control | null;

  getArray(search: SearchControlsProp): string[];
  getString(search: SearchControlsProp): string;
}
