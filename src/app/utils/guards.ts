import { CONTROL_MUTABLE_FIELDS, ORDERS } from '@constants';
import { ConstantsValues } from '@types';

export const isConstOrderType = (value: string): value is ConstantsValues<typeof ORDERS> =>
  Object.hasOwn(ORDERS, value);
export const isConstControlMutableType = (value: string): value is ConstantsValues<typeof CONTROL_MUTABLE_FIELDS> =>
  Object.hasOwn(CONTROL_MUTABLE_FIELDS, value);
export const isHTMLElement = (target: EventTarget | null): target is HTMLElement => target instanceof HTMLElement;
