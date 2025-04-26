export const CNavigableModifiers = { New: 'New', Edit: 'Edit' } as const;
export const CModifiers = { Save: 'Save', Delete: 'Delete', ...CNavigableModifiers } as const;
