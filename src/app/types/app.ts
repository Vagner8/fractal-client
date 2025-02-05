export const AppCollections = {
  Users: 'Users',
  Products: 'Products',
} as const;

export const AppEvents = {
  Hold: 'Hold',
  Touch: 'Touch',
} as const;

export const AppGroups = {
  Taps: 'Taps',
};

export const AppEntities = {
  Root: 'Root',
  Pages: 'Pages',
  Manager: 'Manager',
  Modifiers: 'Modifiers',
};

export const AppModifiers = {
  New: 'New',
  Edit: 'Edit',
  Save: 'Save',
  Delete: 'Delete',
} as const;

export const AppPages = {
  App: 'App',
  Home: 'Home',
  ...AppCollections,
} as const;
