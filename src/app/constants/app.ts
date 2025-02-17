import { constant } from '@utils';

export const ConstSeparator = ':';

export const ConstApp = 'App';
export const ConstEvents = constant(['Hold', 'Touch'] as const);
export const ConstGroups = constant(['Taps'] as const);
export const ConstEditMods = constant(['Fractals', 'Controls'] as const);
export const ConstModifiers = constant(['New', 'Edit', 'Save', 'Delete'] as const);
export const ConstCollections = constant(['Users', 'Products'] as const);

export const ConstPages = constant(['Home', ...ConstCollections.values, ConstApp] as const);
export const ConstEntities = constant(['Pages', 'Manager', 'Modifiers', ConstApp] as const);
export const ConstParams = constant([
  'Selected',
  'EditMode',
  ConstGroups.Taps,
  ConstEntities.Pages,
  ConstEntities.Manager,
  ConstEntities.Modifiers,
] as const);
