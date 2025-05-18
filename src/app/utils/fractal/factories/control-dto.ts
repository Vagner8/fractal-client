import { ConstControlFields } from '@constants';
import { IControlDto, IControlMutableDto } from '@types';
import { v4 } from 'uuid';

export class ControlDto implements IControlDto {
  id: string;
  data: string;
  field: string;
  indicator: string;

  constructor(
    public parentId: string,
    mutableFields?: Partial<IControlMutableDto>
  ) {
    this.id = v4();
    this.data = mutableFields?.data ?? '';
    this.field = mutableFields?.field ?? ConstControlFields.Text;
    this.indicator = mutableFields?.indicator ?? '';
  }
}
