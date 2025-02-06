import { FormControl, FormRecord } from '@angular/forms';
import { FractalFactory } from '@fractal';
import { Fractal, FractalForm, Fractals, FractalsDto } from '@types';

export const constant = <T extends readonly string[]>(
  values: T
): Record<T[number], T[number]> & { values: T; strings: string[] } => {
  const strings: string[] = [];
  const value = Object.fromEntries(
    values.map(value => {
      strings.push(value);
      return [value, value];
    })
  ) as Record<T[number], T[number]>;
  return {
    ...value,
    values,
    strings,
  };
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
