import { IFractal, FractalsDto, IFractalMap } from '@types';
import { Fractal } from './fractal';
import { FractalMap } from '../maps/fractal-map';

export const Fractals = (fractalsDto: FractalsDto | null, parent: IFractal): IFractalMap => {
  const map = new FractalMap();
  let fractal: IFractal;
  for (const indicator in fractalsDto) {
    const dto = fractalsDto[indicator];
    fractal = new Fractal(dto, parent);
    fractal.fractals = Fractals(fractalsDto[indicator].fractals, fractal);
    map.set(indicator, fractal);
  }
  return map;
};
