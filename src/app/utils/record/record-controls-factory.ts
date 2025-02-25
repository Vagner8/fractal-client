import { Control, Indicators, RecordControls } from '@types';
import { RecordFactory } from './record-factory';

export class RecordControlsFactory extends RecordFactory<Control> implements RecordControls {
  getData(value: Indicators | { string: string }): string {
    return this.record[typeof value === 'string' ? value : value.string]?.dto?.data || '';
  }
}
