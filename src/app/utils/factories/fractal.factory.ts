import { Children, Control, Controls, Fractal, FractalDto } from '@types';
import { createChildren, createControls, findChildRecursively } from '../helpers';
import { signal } from '@angular/core';

export class FractalFactory implements Fractal {
  cursor: string;
  parent?: Fractal;
  parentCursor: string;

  controls?: Controls;
  children?: Children;

  $newControls = signal<Control[]>([]);

  constructor({ cursor, parentCursor, children, controls }: FractalDto, parent?: Fractal) {
    this.cursor = cursor;
    this.parentCursor = parentCursor;
    this.parent = parent;
    this.controls = createControls(this, controls);
    this.children = createChildren(this, children);
  }

  is: Fractal['is'] = (cursor) => this.cursor === cursor;
  findChild: Fractal['findChild'] = (cursor) => (this.children ? this.children[cursor] : null);
  findChildRecursively: Fractal['findChildRecursively'] = (cursor) => findChildRecursively(cursor, this.children);
  findControl: Fractal['findControl'] = (cursor) => this.controls?.[cursor] ?? null;
  getStringData: Fractal['getStringData'] = (cursor) => this.findControl(cursor)?.data ?? '';
  getStringsData: Fractal['getStringsData'] = (cursor) => this.findControl(cursor)?.data.split(':') ?? [];
}
