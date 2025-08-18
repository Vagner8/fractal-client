import { signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, ControlDto, ControlType, Fractal } from '@types';

export class ControlFactory implements Control {
  id: string;
  data: string;
  type: ControlType;
  cursor: string;
  parent: Fractal;
  parentCursor: string;

  form: FormGroup | null = null;

  $isFullEditMode = signal(false);

  constructor(parent: Fractal, dto: Partial<ControlDto>) {
    const { id = '', data = '', type = 'String', cursor = '', parentCursor = '' } = dto;
    this.id = id;
    this.data = data;
    this.type = type;
    this.cursor = cursor;
    this.parent = parent;
    this.parentCursor = parentCursor;
  }
}
