import { constant } from '@utils';

export const ConstAppEvents = constant(['Hold', 'Touch'] as const);
export const ConstAppGroups = constant(['Taps'] as const);
export const ConstAppEntities = constant(['Root', 'Pages', 'Manager', 'Modifiers'] as const);
export const ConstAppModifiers = constant(['New', 'Edit', 'Save', 'Delete'] as const);
export const ConstAppCollections = constant(['Users', 'Products'] as const);
export const ConstAppPages = constant(['App', 'Home', ...ConstAppCollections.values] as const);
