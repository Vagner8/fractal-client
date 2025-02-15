import { constant } from '@utils';

export const ConstControlFormKeys = constant(['indicator', 'input', 'data'] as const);
export const ConstControlKeys = constant(['id', 'parentId'] as const);
export const ConstControlDtoKeys = constant([...ConstControlFormKeys.values, ...ConstControlKeys.values] as const);
export const ConstControlInputs = constant(['Text', 'Select', 'Organizer'] as const);
