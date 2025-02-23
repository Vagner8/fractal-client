import { ConstControlInputs, ConstControlFormKeys } from '@constants';
import { ControlDto, ControlForm, Fractal, FractalDto } from '@types';
import { updateSelectValue } from '../common';

const updateControlByFormRecord = (control: ControlDto, controlForm: ControlForm): void => {
  ConstControlFormKeys.values.forEach(key => {
    const fromControl = controlForm.controls[key];
    if (!fromControl.dirty) return;
    if (control.input === ConstControlInputs.Select && key === 'data') {
      control[key] = updateSelectValue({ value: fromControl.value, data: control.data });
    } else {
      control[key] = fromControl.value;
    }
  });
};

const updateFractalByForm = (fractal: Fractal): FractalDto => {
  for (const indicator in fractal.dto.controls) {
    const controlFormRecord = fractal.form.controls[indicator];
    if (controlFormRecord.dirty) {
      updateControlByFormRecord(fractal.dto.controls[indicator], controlFormRecord);
    }
  }
  return fractal.dto;
};

export const updateFractalsByForm = (fractals: Fractal[]): FractalDto[] =>
  fractals.reduce((acc: FractalDto[], fractal) => {
    if (fractal.form.dirty) acc.push(updateFractalByForm(fractal));
    return acc;
  }, []);
