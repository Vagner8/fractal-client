import { WritableSignal } from '@angular/core';
import { Control, ControlsDto } from './control.types';
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
  $newControls: WritableSignal<Control[]>;

  is(search: SearchFractalsProp): boolean;

  getChild(search: SearchFractalsProp): Fractal;
  findChild(search: SearchFractalsProp): Fractal | undefined;

  findChildRecursively(search: SearchFractalsProp): Fractal | null;
  getChildRecursively(search: SearchFractalsProp): Fractal;

  getControl(search: SearchControlsProp): Control;
  findControl(search: SearchControlsProp): Control | null;

  getString(search: SearchControlsProp): string;
  getArray(search: SearchControlsProp): string[];
}
