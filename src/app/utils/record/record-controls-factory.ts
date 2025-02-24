import { Control, Indicators, RecordControls } from '@types';

export class RecordControlsFactory implements RecordControls {
  record: Record<string, Control> = {};

  get values(): Control[] {
    return Object.values(this.record);
  }

  get(indicator: string): Control {
    return this.record[indicator];
  }

  getData(value: Indicators | { string: string }): string {
    return this.record[typeof value === 'string' ? value : value.string]?.dto?.data || '';
  }
}
