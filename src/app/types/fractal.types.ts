import { WritableSignal } from '@angular/core';
import { Control, Controls, ControlsCursors, ControlsDto } from './control.types';

export type Children = Record<string, Fractal>;
export type ChildrenDto = Record<string, FractalDto>;
export type FractalSettingsCursors = 'Back button';
export type FractalsCommonCursors = 'App' | 'Settings' | 'Modifiers';
export type FractalsCursors = FractalSettingsCursors | FractalsCommonCursors;

export interface FractalDto {
  cursor: string;
  parentCursor: string;

  controls?: ControlsDto;
  children?: ChildrenDto;
  childrenControls?: ControlsDto;
}

export interface Fractal extends FractalDto {
  parent?: Fractal;
  children?: Children;
  controls?: Controls;
  childrenControls?: Controls;

  $newControls: WritableSignal<Control[]>;

  is(search: FractalsCursors | [string]): boolean;
  findChild(search: FractalsCursors | [string]): Fractal | null;
  findChildRecursively(search: FractalsCursors | [string]): Fractal | null;
  findControl(search: ControlsCursors | [string]): Control | null;
  findChildrenControl(cursor: string): Control | null;
  getStringData(search: ControlsCursors | [string]): string;
  getStringsData(search: ControlsCursors | [string]): string[];
}
