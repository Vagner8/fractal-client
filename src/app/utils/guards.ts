import { ConstOrderType, IFractal } from '@types';
import { Fractal } from './fractals';
import { ConstOrder } from '@constants';

export const isFractal = (value: unknown): value is IFractal => value instanceof Fractal;
export const isConstOrderType = (value: string): value is ConstOrderType =>
  Object.prototype.hasOwnProperty.call(ConstOrder, value);
