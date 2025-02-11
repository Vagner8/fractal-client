import { ControlDto, ControlFormKeys, ControlKeys } from '@types';
import { constant } from '@utils';

export const ConstControlFormKeys = constant(['input', 'indicator', 'data'] as (keyof ControlFormKeys)[]);
export const ConstControlKeys = constant(['id', 'parentId'] as (keyof ControlKeys)[]);
export const ConstControlDtoKeys = constant([
  ...ConstControlFormKeys.values,
  ...ConstControlKeys.values,
] as (keyof ControlDto)[]);
export const ConstControlInputs = constant(['Text', 'Select', 'Organizer'] as const);
