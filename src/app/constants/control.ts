export const ConstControlMutableKeys = { indicator: 'indicator', input: 'input', data: 'data' } as const;
export const ConstControlImmutableKeys = { id: 'id', parentId: 'parentId' } as const;
export const ConstControlKeys = { ...ConstControlMutableKeys, ...ConstControlImmutableKeys } as const;

export const ConstControlInputs = { Text: 'Text', Select: 'Select', Organizer: 'Organizer' } as const;
