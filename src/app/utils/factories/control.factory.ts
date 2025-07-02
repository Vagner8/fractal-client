import { signal } from '@angular/core';
import { Control, ControlDtoMutable, ControlType, Fractal } from '@types';

export class ControlFactory implements Control {
  data: string;
  type: ControlType;
  cursor: string;
  parent: Fractal;
  parentCursor: string;

  $isFullEditMode = signal(false);

  constructor(parent: Fractal, dto: Partial<ControlDtoMutable>) {
    const { data = '', type = 'String', cursor = '' } = dto;
    this.data = data;
    this.type = type;
    this.cursor = cursor;
    this.parent = parent;
    this.parentCursor = parent.cursor;
  }
}
