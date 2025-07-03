import { Children, Control, Controls, Fractal, FractalDto, SearchControlsProp, SearchFractalsProp } from '@types';
import { createChildren, createControls, findChildRecursively, parseSearch } from '../helpers';
import { signal } from '@angular/core';

export class FractalFactory implements Fractal {
  private readonly _parent?: Fractal;
  cursor: string;
  parentCursor: string;

  controls?: Controls;
  children?: Children;

  $newControls = signal<Control[]>([]);

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

  findChild = (search: SearchFractalsProp): Fractal | null =>
    this.children ? this.children?.[parseSearch(search)] : null;

  findChildRecursively = (search: SearchFractalsProp): Fractal | null => findChildRecursively(search, this.children);

  findControl = (search: SearchControlsProp): Control | null => this.controls?.[parseSearch(search)] ?? null;

  getString = (search: SearchControlsProp): string => this.findControl(search)?.data ?? '';

  getArray = (search: SearchControlsProp): string[] => this.getString(search).split(':').filter(Boolean);
}
