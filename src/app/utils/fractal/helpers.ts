import { FractalFactory } from 'app/utils/fractal';
import { Controls, Fractal, Fractals, FractalsDto } from '@types';
import { ControlFactory } from '../control/control-factory';

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

export const createControls = (fractal: Fractal): Controls => {
  const { dto, form } = fractal;
  return Object.fromEntries(
    Object.entries(dto.controls).map(([key, controlDto]) => {
      const control = new ControlFactory(controlDto);
      form.addControl(key, control.form);
      return [key, control];
    })
  );
};
