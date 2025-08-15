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

  $newControls: WritableSignal<Control[]>;

  is(cursor: FractalsCursors | [string]): boolean;
  findChild(cursor: FractalsCursors | [string]): Fractal | null;
  findChildRecursively(cursor: FractalsCursors | [string]): Fractal | null;
  findControl(cursor: ControlsCursors | [string]): Control | null;
  getStringData(cursor: ControlsCursors | [string]): string;
  getStringsData(cursor: ControlsCursors | [string]): string[];
}
