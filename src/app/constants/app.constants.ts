export const WORDS = { NEW: 'New' } as const;
export const APP_PAGES = { ADMIN: 'Admin', HOME: 'Home', EDITOR: 'Editor' } as const;
export const APP_EVENTS = { HOLD: 'Hold', TOUCH: 'Touch' } as const;

export const HOLD_THRESHOLD = 820;
export const TOUCH_THRESHOLD = 150;

export const APP_FRACTALS = {
  APP: 'App',
  PAGES: 'Pages',
  MANAGER: 'Manager',
  SETTINGS: 'Settings',
  MODIFIERS: 'Modifiers',
  COLLECTIONS: 'Collections',
} as const;

export const QUERY_PARAMS = {
  TAPS: 'Taps',
  MANAGER: 'Manager',
  SELECTED: 'Selected',
  EDIT_MODE: 'EditMode',
  MODIFIERS: 'Modifiers',
} as const;

export const PARAMS = {
  APP: 'App',
  COLLECTION: 'Collection',
} as const;

export const CUSTOM_CHILDREN_COLUMNS = {
  NO: 'No.',
  CURSOR: 'cursor',
};
