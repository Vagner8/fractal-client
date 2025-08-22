import { Children, Control, Controls, Fractal, FractalDto } from '@types';
import { createChildren, createControls, findChildRecursively } from '../helpers';
import { signal } from '@angular/core';
import { ControlFactory } from './control.factory';

export class FractalFactory implements Fractal {
  cursor = '';
  parent: Fractal | null = null;
  parentCursor: string | null = null;

  controls: Controls | null = null;
  children: Children | null = null;
  childrenControls: Controls | null = null;

  $newControls = signal<Control[]>([]);

  constructor(parent: Fractal | null, dto?: FractalDto) {
    if (parent) {
      this.parentCursor = parent.cursor;
      this.parent = parent;
    }
    if (dto) {
      this.cursor = dto.cursor;
      this.children = createChildren(this, dto.children);
      this.controls = createControls(this, dto.controls);
      this.childrenControls = createControls(this, dto.childrenControls);
    }
  }

  is: Fractal['is'] = (search) => this.cursor === this.parseSearch(search);

  findChild: Fractal['findChild'] = (search) => (this.children ? this.children[this.parseSearch(search)] : null);

  findChildRecursively: Fractal['findChildRecursively'] = (search) =>
    findChildRecursively(this.parseSearch(search), this.children);

  findControl: Fractal['findControl'] = (search) => this.controls?.[this.parseSearch(search)] ?? null;

  findChildrenControl: Fractal['findChildrenControl'] = (cursor) => this.childrenControls?.[cursor] ?? null;

  getTextData: Fractal['getTextData'] = (search) => this.findControl(search)?.data ?? '';

  getSplittableData: Fractal['getSplittableData'] = (search) => this.findControl(search)?.data.split(':') ?? [];

  addControl: Fractal['addControl'] = () => {
    const newControl = new ControlFactory(this);
    if (this.controls) {
      this.controls[newControl.cursor] = newControl;
      const controls = this.findControl('controls');
      controls?.push(newControl.cursor);
    }
  };

  private readonly parseSearch = (search: string | [string]): string =>
    typeof search === 'string' ? search : search[0];
}
