import { ControlDto } from '@types';
import { v4 } from 'uuid';

export class ControlDtoFactory implements ControlDto {
  id = v4();
  input = '';
  data = '';
  indicator = '';

  constructor(public parentId: string) {}
}
