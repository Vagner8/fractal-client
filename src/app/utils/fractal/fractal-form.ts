import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlInputs, ConstControlFormKeys } from '@constants';
import { ControlDto, ControlForm, Fractal, FractalDto, FractalForm } from '@types';
import { updateSelectValue } from '../common';

export const createControlFromRecord = (control: ControlDto): ControlForm => {
  const formRecord = new FormRecord<FormControl>({});
  ConstControlFormKeys.values.forEach(key => {
    return formRecord.addControl(key, new FormControl(control[key]));
  });
  return formRecord;
};

export const createFractalForm = (fractal: Fractal): FractalForm => {
  const fractalForm: FractalForm = new FormRecord({});
  for (const indicator in fractal.dto.controls) {
    const controlFromRecord = createControlFromRecord(fractal.dto.controls[indicator]);
    fractalForm.addControl(indicator, controlFromRecord);
    if (fractal.isItem) fractal.parent.childrenForms.addControl(fractal.cursor, controlFromRecord);
  }
  return fractalForm;
};

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
