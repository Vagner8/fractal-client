import { Control } from '@types';
import { RecordAbstract } from './record-abstract';
import { ConstIndicators } from '@constants';

export class RecordControls extends RecordAbstract<Control> {
  override get(value: (typeof ConstIndicators.values)[number] | { string: string }): string {
    return this.record[typeof value === 'string' ? value : value.string]?.dto?.data || '';
  }
}
