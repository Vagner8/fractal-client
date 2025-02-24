import { constant } from '@utils';

export const ConstSeparator = ':';

export const ConstApp = 'App';
export const ConstEvents = constant(['Hold', 'Touch'] as const);
export const ConstGroups = constant(['Taps'] as const);
export const ConstEditMods = constant(['Fractals', 'Controls'] as const);
export const ConstCollections = constant(['Users', 'Products'] as const);

export const ConstPages = constant(['Home', ...ConstCollections.values, ConstApp] as const);
export const ConstEntities = constant(['Pages', 'Manager', 'Modifiers', 'Collections', ConstApp] as const);
export const ConstParams = constant([
  'Selected',
  'EditMode',
  ConstGroups.Taps,
  ConstEntities.Pages,
  ConstEntities.Manager,
  ConstEntities.Modifiers,
  ConstEntities.Collections,
] as const);

export const ConstNavigationModifiers = constant(['Edit', 'New'] as const);
export const ConstHoldModifiers = constant(['Save', 'Delete', ConstNavigationModifiers.Edit] as const);
export const ConstModifiers = constant([ConstNavigationModifiers.New, ...ConstHoldModifiers.values] as const);
