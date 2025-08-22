import { Control, ControlDto, ControlType } from '@types';

export class ControlDtoFactory implements ControlDto {
  id: string;
  data: string;
  type: ControlType;
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
