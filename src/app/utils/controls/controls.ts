import { IControlMap, IFractal, FractalInitOptions } from '@types';
import { Control } from './control';
import { ControlMap } from '../maps/control-map';

export const Controls = (fractal: IFractal, options?: FractalInitOptions): IControlMap => {
  const { dto, form } = fractal;
  const map = new ControlMap();
  Object.entries(dto.controls).forEach(([key, controlDto]) => {
    const control = new Control(controlDto, options);
    map.set(key, control);
    form.addControl(key, control.form);
  });
  return map;
};
