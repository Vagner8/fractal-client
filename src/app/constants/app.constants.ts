export const WORDS = { NEW: 'New', IDLE: 'Idle' } as const;
export const APP_PAGES = { APP: 'App', HOME: 'Home', EDITOR: 'Editor' } as const;
export const APP_EVENTS = { HOLD: 'Hold', TOUCH: 'Touch' } as const;

export const HOLD_THRESHOLD = 820;
export const TOUCH_THRESHOLD = 150;

export const APP_FRACTALS = {
  APP: 'App',
  MANAGER: 'Manager',
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
  COLLECTION: 'Collection',
} as const;
