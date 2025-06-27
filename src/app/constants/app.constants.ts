export const WORDS = { NEW: 'New' } as const;
export const APP_PAGES = { APP: 'App', HOME: 'Home' } as const;
export const APP_EVENTS = { HOLD: 'Hold', TOUCH: 'Touch' } as const;

export const HOLD_THRESHOLD = 820;
export const TOUCH_THRESHOLD = 150;

export const APP_FRACTALS = {
  APP: 'App',
  MANAGER: 'Manager',
  MODIFIERS: 'Modifiers',
  COLLECTIONS: 'Collections',
} as const;

export const APP_PARAMS = {
  TAPS: 'Taps',
  PAGE: 'Page',
  MANAGER: 'Manager',
  SELECTED: 'Selected',
  EDIT_MODE: 'EditMode',
  MODIFIERS: 'Modifiers',
} as const;
