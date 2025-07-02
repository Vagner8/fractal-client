import { signal } from '@angular/core';
import { Control, ControlDto, ControlType, Fractal } from '@types';

export class ControlFactory implements Control {
  data: string;
  type: ControlType;
  cursor: string;
  parent: Fractal;
  parentCursor: string;

  $isFullEditMode = signal(false);

  constructor(parent: Fractal, dto: ControlDto) {
    this.data = dto.data;
    this.type = dto.type;
    this.cursor = dto.cursor;
    this.parent = parent;
    this.parentCursor = dto.parentCursor;
  }
}
