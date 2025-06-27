export const NAVIGABLE_MODIFIERS = { NEW: 'New', EDIT: 'Edit' } as const;
export const MODIFIERS = { SAVE: 'Save', DELETE: 'Delete', ...NAVIGABLE_MODIFIERS } as const;
