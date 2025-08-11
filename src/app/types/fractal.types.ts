import { WritableSignal } from '@angular/core';
import { Control, Controls, ControlsDto } from './control.types';

export type Children = Record<string, Fractal>;
export type ChildrenDto = Record<string, FractalDto>;

export interface FractalDto {
  cursor: string;
  parentCursor: string;

  controls?: ControlsDto;
  children?: ChildrenDto;
}

export interface Fractal extends FractalDto {
  parent?: Fractal;
  children?: Children;
  controls?: Controls;

  $newControls: WritableSignal<Control[]>;

  is(cursor: string): boolean;
  findChild(cursor: string): Fractal | null;
  findChildRecursively(cursor: string): Fractal | null;
  findControl(cursor: string): Control | null;
  getStringData(cursor: string): string;
  getStringsData(cursor: string): string[];
}
