import { signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, ControlDto, ControlType, Fractal } from '@types';
import { v4 } from 'uuid';

export class ControlFactory implements Control {
  id: string;
  data: string;
  type: ControlType;
  cursor: string;
  parent: Fractal | null;
  parentCursor: string | null;

  form: FormGroup | null = null;

  $isFullEditMode = signal(false);

  constructor(parent: Fractal, dto?: Partial<ControlDto>) {
    this.id = dto?.id || v4();
    this.data = dto?.data || '';
    this.type = dto?.type || 'text';
    this.cursor = dto?.cursor || `new-${parent.getSplittableData('controls').length}`;
    this.parent = parent;
    this.parentCursor = dto?.parentCursor || parent.parentCursor;
  }

  push: Control['push'] = (data) => {
    if (this.type === 'splittable') {
      this.data = `${this.data}:${data}`;
    } else {
      throw new Error('Wrong control type for the push operation');
    }
  };
}
