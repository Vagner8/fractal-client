import { ConstControlMutableType, ConstOrderType, IFractal } from '@types';
import { Fractal } from './fractal';
import { ConstControlMutable, ConstOrder } from '@constants';

export const isFractal = (value: unknown): value is IFractal => value instanceof Fractal;
export const isConstOrderType = (value: string): value is ConstOrderType =>
  Object.prototype.hasOwnProperty.call(ConstOrder, value);
export const isConstControlMutableType = (value: string): value is ConstControlMutableType =>
  Object.prototype.hasOwnProperty.call(ConstControlMutable, value);
