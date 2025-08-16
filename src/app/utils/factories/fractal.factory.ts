import { Children, Control, Controls, Fractal, FractalDto } from '@types';
import { createChildren, createControls, findChildRecursively } from '../helpers';
import { signal } from '@angular/core';

export class FractalFactory implements Fractal {
  cursor: string;
  parent?: Fractal;
  parentCursor: string;

  controls?: Controls;
  children?: Children;
  childrenControls?: Controls;

  $newControls = signal<Control[]>([]);

  constructor({ cursor, parentCursor, children, controls, childrenControls }: FractalDto, parent?: Fractal) {
    this.cursor = cursor;
    this.parentCursor = parentCursor;
    this.parent = parent;
    this.controls = createControls(this, controls);
    this.children = createChildren(this, children);
    this.childrenControls = createControls(this, childrenControls);
  }

  is: Fractal['is'] = (search) => this.cursor === this.parseSearch(search);

  findChild: Fractal['findChild'] = (search) => (this.children ? this.children[this.parseSearch(search)] : null);

  findChildRecursively: Fractal['findChildRecursively'] = (search) =>
    findChildRecursively(this.parseSearch(search), this.children);

  findControl: Fractal['findControl'] = (search) => this.controls?.[this.parseSearch(search)] ?? null;

  findChildrenControl: Fractal['findChildrenControl'] = (cursor) => this.childrenControls?.[cursor] ?? null;

  getStringData: Fractal['getStringData'] = (search) => this.findControl(search)?.data ?? '';

  getStringsData: Fractal['getStringsData'] = (search) => this.findControl(search)?.data.split(':') ?? [];

  private readonly parseSearch = (search: string | [string]): string =>
    typeof search === 'string' ? search : search[0];
}
