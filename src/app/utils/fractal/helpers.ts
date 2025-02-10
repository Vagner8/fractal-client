import { FormControl, FormRecord } from '@angular/forms';
import { FractalFactory } from 'app/utils/fractal';
import { Fractal, FractalDto, FractalForm, Fractals, FractalsDto } from '@types';
import { updateSelectValue } from '../common';
import { ControlInputs } from '@constants';

export const createFractalsRecursively = (fractalsDto: FractalsDto | null, parent: Fractal): Fractals | null => {
  if (!fractalsDto) return null;
  const result: Fractals = {};
  for (const indicator in fractalsDto) {
    const fractal = new FractalFactory({ parent, dto: fractalsDto[indicator] });
    fractal.fractals = createFractalsRecursively(fractalsDto[indicator].fractals, fractal);
    result[indicator] = fractal;
  }
  return result;
};

export const findFractalRecursively = (test: string, fractals: Fractals | null): Fractal | null => {
  if (fractals) {
    for (const key in fractals) {
      if (fractals[key].is(test) || fractals[key].dto.id === test) return fractals[key];
      const found = findFractalRecursively(test, fractals[key].fractals);
      if (found) return found;
    }
  }
  return null;
};

export const createForm = (fractal: Fractal): FractalForm => {
  const formRecord = new FormRecord(
    fractal.controls.reduce((acc: Record<string, FormControl>, { data, indicator }) => {
      acc[indicator] = new FormControl(data);
      return acc;
    }, {})
  );

  if (fractal.isItem) {
    fractal.parent.childrenForms.addControl(fractal.cursor, formRecord);
  }
  return formRecord;
};

const updateFractalByForm = (fractal: Fractal): FractalDto => {
  for (const indicator in fractal.dto.controls) {
    const { value } = fractal.getControlForm(indicator);
    const control = fractal.getControl(indicator);
    if (control.input === ControlInputs.Select) {
      control.data = updateSelectValue({ value, data: control.data });
    } else {
      control.data = value;
    }
  }
  return fractal.dto;
};

export const updateFractalsByForm = (fractals: Fractal[]): FractalDto[] => {
  return fractals.reduce((acc: FractalDto[], fractal) => {
    if (fractal.form.dirty) acc.push(updateFractalByForm(fractal));
    return acc;
  }, []);
};
