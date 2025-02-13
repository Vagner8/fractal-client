import { constant } from '@utils';

export const ConstApp = constant(['App'] as const);
export const ConstAppEvents = constant(['Hold', 'Touch'] as const);
export const ConstAppGroups = constant(['Taps'] as const);
export const ConstAppEntities = constant(['Pages', 'Manager', 'Modifiers', ...ConstApp.values] as const);
export const ConstAppModifiers = constant(['New', 'Edit', 'Save', 'Delete'] as const);
export const ConstAppCollections = constant(['Users', 'Products'] as const);
export const ConstAppPages = constant(['Home', ...ConstAppCollections.values, ...ConstApp.values] as const);
