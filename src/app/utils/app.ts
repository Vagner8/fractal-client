import { constant } from './common';

export const AppEvents = constant(['Hold', 'Touch'] as const);
export const AppGroups = constant(['Taps'] as const);
export const AppEntities = constant(['Root', 'Pages', 'Manager', 'Modifiers'] as const);
export const AppModifiers = constant(['New', 'Edit', 'Save', 'Delete'] as const);
export const AppCollections = constant(['Users', 'Products'] as const);
export const AppPages = constant(['App', 'Home', ...AppCollections.values] as const);
