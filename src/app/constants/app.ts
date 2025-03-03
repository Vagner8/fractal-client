export const ConstSeparator = ':';

export const ConstAppPages = { App: 'App', Home: 'Home' } as const;
export const ConstAppEvents = { Hold: 'Hold', Touch: 'Touch' } as const;
export const ConstSidenavTaps = { Modifiers: 'Modifiers', Collections: 'Collections' } as const;
export const ConstAppFractals = { App: 'App', ...ConstSidenavTaps } as const;

export const ConstAppParams = {
  Taps: 'Taps',
  Page: 'Page',
  Manager: 'Manager',
  Selected: 'Selected',
  EditMode: 'EditMode',
  Modifiers: 'Modifiers',
} as const;
