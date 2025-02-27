import { Control, RecordControls } from '@types';
import { RecordFactory } from './record-factory';
import { ConstIndicators } from '@constants';

export class RecordControlsFactory extends RecordFactory<Control> implements RecordControls {
  override get(indicator: keyof typeof ConstIndicators | { unsaveIndicator: string }): Control | null {
    const result = typeof indicator === 'string' ? this.record[indicator] : this.record[indicator.unsaveIndicator];
    return result ? result : null;
  }
}
