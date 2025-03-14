import { ConstControlInputs } from '@constants';
import { IControlDto, IControlMutableDto } from '@types';
import { v4 } from 'uuid';

export class ControlDto implements IControlDto {
  id: string;
  data: string;
  field: string;
  indicator: string;

  constructor(
    public parentId: string,
    values?: Partial<IControlMutableDto>
  ) {
    this.id = v4();
    this.data = values?.data || '';
    this.field = values?.field || ConstControlInputs.Text;
    this.indicator = values?.indicator || '';
  }
}
