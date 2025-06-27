import { ControlDto, ControlsDto } from './control.types';
import { SearchControlsProp, SearchFractalsProp } from './helpers.types';

export type Children = Record<string, Fractal>;
export type ChildrenDto = Record<string, FractalDto>;

export interface FractalDto {
  id: string;
  parentId: string;
  controls: ControlsDto;
  children: ChildrenDto;
}

export interface Fractal extends FractalDto {
  parent: Fractal;
  cursor: string;
  children: Children;

  is(search: SearchFractalsProp): boolean;

  findChild(search: SearchFractalsProp): Fractal;
  findChildRecursively(search: SearchFractalsProp): Fractal | null;
  getChildRecursively(search: SearchFractalsProp): Fractal;

  getControl(search: SearchControlsProp): ControlDto;
  findControl(search: SearchControlsProp): ControlDto | null;

  getString(search: SearchControlsProp): string;
  getArray(search: SearchControlsProp): string[];
}
