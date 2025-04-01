import { ConstControlMutableType, ConstOrderType, IFractal } from '@types';
import { Fractal } from './fractal';
import { ConstControlMutable, ConstOrder } from '@constants';

export const isFractal = (value: unknown): value is IFractal => value instanceof Fractal;
export const isConstOrderType = (value: string): value is ConstOrderType => Object.hasOwn(ConstOrder, value);
export const isConstControlMutableType = (value: string): value is ConstControlMutableType =>
  Object.hasOwn(ConstControlMutable, value);
export const isHTMLElement = (target: EventTarget | null): target is HTMLElement => target instanceof HTMLElement;
