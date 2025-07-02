import { Children, ControlDto, Controls, Fractal, FractalDto, SearchControlsProp, SearchFractalsProp } from '@types';
import {
  createChildren,
  createControls,
  ensureControlDtoExists,
  ensureExists,
  ensureFractalExists,
  findChildRecursively,
  parseSearch,
} from '../helpers';
import { signal } from '@angular/core';

export class FractalFactory implements Fractal {
  private readonly _parent?: Fractal;
  cursor: string;
  parentCursor: string;

  controls?: Controls;
  children?: Children;

  $newControls = signal<ControlDto[]>([]);

  constructor(parent: Fractal, { cursor, parentCursor, children, controls }: FractalDto) {
    this.cursor = cursor;
    this.parentCursor = parentCursor;
    this._parent = parent;
    this.controls = createControls(this, controls);
    this.children = createChildren(this, children);
  }

  get parent(): Fractal {
    if (this._parent instanceof FractalFactory) {
      return this._parent;
    } else {
      throw new Error('Unable to get parent for the App fractal');
    }
  }

  is = (search: SearchFractalsProp): boolean => this.cursor === parseSearch(search);

  getChild = (search: SearchFractalsProp): Fractal => ensureFractalExists(this.findChild(search), search);
  findChild = (search: SearchFractalsProp): Fractal | undefined =>
    this.children ? this.children?.[parseSearch(search)] : undefined;

  findChildRecursively = (search: SearchFractalsProp): Fractal | null => findChildRecursively(search, this.children);
  getChildRecursively = (search: SearchFractalsProp): Fractal =>
    ensureFractalExists(findChildRecursively(search, this.children), search);

  getControl = (search: SearchControlsProp): ControlDto => ensureControlDtoExists(this.findControl(search), search);
  findControl = (search: SearchControlsProp): ControlDto | null => this.controls?.[parseSearch(search)] ?? null;

  getString = (search: SearchControlsProp): string => this.findControl(search)?.data ?? '';
  getArray = (search: SearchControlsProp): string[] => ensureExists(this.getString(search).split(':').filter(Boolean));
}
