import { ConstControlInputs } from '@constants';
import { IControlDto } from '@types';
import { v4 } from 'uuid';

export class ControlDto implements IControlDto {
  id: string;
  data: string;
  input: string;
  indicator: string;

  constructor(public parentId: string) {
    this.id = v4();
    this.data = '';
    this.input = ConstControlInputs.Text;
    this.indicator = '';
  }
}
