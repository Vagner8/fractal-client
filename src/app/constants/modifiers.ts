export const ConstNavigableModifiers = { New: 'New', Edit: 'Edit' } as const;
export const ConstModifiers = { Save: 'Save', Delete: 'Delete', ...ConstNavigableModifiers } as const;
