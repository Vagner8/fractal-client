import { Control, ControlDto, ControlTypes } from '@types';

export class ControlDtoFactory implements ControlDto {
  id: string;
  data: string;
  type: ControlTypes;
  cursor: string;
  parentCursor: string | null;

  constructor(control: Control) {
    const { id, data, type, cursor, parentCursor } = control;
    this.id = id;
    this.data = data;
    this.type = type;
    this.cursor = cursor;
    this.parentCursor = parentCursor;
  }
}
