import { constant } from '@utils';

export const NewControlKeys = constant(['input', 'indicator', 'data'] as const);
export const ControlKeys = constant([...NewControlKeys.values, 'id', 'parentId'] as const);
export const ControlInputs = constant(['Text', 'Select', 'Organizer'] as const);
