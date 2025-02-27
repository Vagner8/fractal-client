import { Control, ControlsRecord } from '@types';
import { RecordFactory } from '../record-factory';
import { ConstIndicators } from '@constants';

export class ControlsRecordFactory extends RecordFactory<Control> implements ControlsRecord {
  get getCursorData(): string {
    return this.get('Cursor')?.get('data') || '';
  }

  override get(indicator: keyof typeof ConstIndicators | { unsaveIndicator: string }): Control | null {
    const result = typeof indicator === 'string' ? this.record[indicator] : this.record[indicator.unsaveIndicator];
    return result ? result : null;
  }
}
