import { ConstControlMutableType, ConstOrderType, IFractal } from '@types';
import { Fractal } from './fractal';
import { CControlMutable, COrders } from '@constants';

export const isFractal = (value: unknown): value is IFractal => value instanceof Fractal;
export const isConstOrderType = (value: string): value is ConstOrderType => Object.hasOwn(COrders, value);
export const isConstControlMutableType = (value: string): value is ConstControlMutableType =>
  Object.hasOwn(CControlMutable, value);
export const isHTMLElement = (target: EventTarget | null): target is HTMLElement => target instanceof HTMLElement;
