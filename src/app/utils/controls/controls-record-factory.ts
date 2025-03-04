import { Control, ControlsRecord, ControlsRecordGetProps } from '@types';
import { RecordFactory } from '../record-factory';

export class ControlsRecordFactory extends RecordFactory<Control> implements ControlsRecord {
  override get(indicator: ControlsRecordGetProps): Control | null {
    const control = this.record[typeof indicator === 'string' ? indicator : indicator.unknownIndicator];
    return control ? control : null;
  }

  getControlData(indicator: ControlsRecordGetProps): string {
    return this.get(indicator)?.dto.data || '';
  }

  getControlDataAndSplit(indicator: ControlsRecordGetProps): string[] {
    const result = this.getControlData(indicator).split(':');
    return result.length > 0 ? result : [];
  }
}
