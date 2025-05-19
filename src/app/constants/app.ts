export const CAppPages = { App: 'App', Home: 'Home' } as const;
export const CAppEvents = { Hold: 'Hold', Touch: 'Touch' } as const;
export const CSidenavTaps = { Modifiers: 'Modifiers', Collections: 'Collections' } as const;
export const CAppFractals = { App: 'App', ...CSidenavTaps } as const;

export const CAppParams = {
  Taps: 'Taps',
  Page: 'Page',
  Manager: 'Manager',
  Selected: 'Selected',
  EditMode: 'EditMode',
  Modifiers: 'Modifiers',
} as const;

export const CWords = { New: 'New' } as const;

export const CHoldThreshold = 820;
