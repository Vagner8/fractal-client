export const ConstControlMutable = { indicator: 'indicator', field: 'field', data: 'data' } as const;
export const ConstControlImmutable = { id: 'id', parentId: 'parentId' } as const;
export const ConstControlKeys = { ...ConstControlMutable, ...ConstControlImmutable } as const;

export const ConstControlInputs = { Text: 'Text', Select: 'Select', Organizer: 'Organizer' } as const;
