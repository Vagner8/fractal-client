import { ControlsRecord, Fractal, FractalInitOptions } from '@types';
import { ControlsRecordFactory } from './controls-record-factory';
import { ControlFactory } from './control-factory';

export const ControlsFactory = (fractal: Fractal, options?: FractalInitOptions): ControlsRecord => {
  const { dto, form } = fractal;
  const record = new ControlsRecordFactory();
  Object.entries(dto.controls).forEach(([key, controlDto]) => {
    const control = new ControlFactory(controlDto, options);
    form.addControl(key, control.form);
    record.record[key] = control;
  });
  return record;
};
