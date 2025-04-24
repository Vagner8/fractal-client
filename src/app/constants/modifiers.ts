export const CNavigableModifiers = { New: 'New', Edit: 'Edit' } as const;
export const ConstModifiers = { Save: 'Save', Delete: 'Delete', ...CNavigableModifiers } as const;
