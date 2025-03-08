import { IFractal, FractalInitOptions } from '@types';
import { Fractal } from './fractal';
import { FractalDto } from './fractal-dto';

export const NewFractal = (parent: IFractal, options: FractalInitOptions): IFractal => {
  return new Fractal(new FractalDto(parent), parent, options);
};
