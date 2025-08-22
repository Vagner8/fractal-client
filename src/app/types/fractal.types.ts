import { WritableSignal } from '@angular/core';
import { Control, Controls, ControlsCursors, ControlsDto } from './control.types';

export type Children = Record<string, Fractal>;
export type ChildrenDto = Record<string, FractalDto>;
export type FractalFields = keyof Pick<FractalDto, 'children' | 'controls' | 'childrenControls'>;
export type FractalSettingsCursors = 'Back button';
export type FractalsCommonCursors = 'App' | 'Settings' | 'modifiers';
export type FractalsCursors = FractalSettingsCursors | FractalsCommonCursors;
export type Modifiers = 'new' | 'edit' | 'save' | 'delete';

export interface FractalDto {
  cursor: string;
  parentCursor: string | null;

  controls: ControlsDto | null;
  children: ChildrenDto | null;
  childrenControls: ControlsDto | null;
}

export interface Fractal extends FractalDto {
  parent: Fractal | null;
  children: Children | null;
  controls: Controls | null;
  childrenControls: Controls | null;

  $newControls: WritableSignal<Control[]>;

  is(search: FractalsCursors | [string]): boolean;
  findChild(search: FractalsCursors | [string]): Fractal | null;
  findChildRecursively(search: FractalsCursors | [string]): Fractal | null;
  findControl(search: ControlsCursors | [string]): Control | null;
  findChildrenControl(cursor: string): Control | null;
  getTextData(search: ControlsCursors | [string]): string;
  getSplittableData(search: ControlsCursors | [string]): string[];

  addControl(): void;
}
