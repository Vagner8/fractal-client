export const CControlMutable = { indicator: 'indicator', field: 'field', data: 'data' } as const;
export const ConstControlImmutable = { id: 'id', parentId: 'parentId' } as const;
export const ConstControlKeys = { ...CControlMutable, ...ConstControlImmutable } as const;

export const ConstControlFields = { Text: 'Text', Select: 'Select', Organizer: 'Organizer' } as const;
