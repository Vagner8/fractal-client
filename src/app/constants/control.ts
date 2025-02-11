import { ControlDto, ControlEditableKeys, ControlKeys } from '@types';
import { constant } from '@utils';

export const ConstControlDtoEditableKeys = constant(['input', 'indicator', 'data'] as (keyof ControlEditableKeys)[]);
export const ConstControlKeys = constant(['id', 'parentId'] as (keyof ControlKeys)[]);
export const ConstControlDtoKeys = constant([
  ...ConstControlDtoEditableKeys.values,
  ...ConstControlKeys.values,
] as (keyof ControlDto)[]);
export const ConstControlInputs = constant(['Text', 'Select', 'Organizer'] as const);
