export const CONTROL_MUTABLE_FIELDS = { INDICATOR: 'indicator', TYPE: 'type', DATA: 'data' } as const;
export const CONTROL_IMMUTABLE_FIELDS = { ID: 'id', PARENT_ID: 'parentId' } as const;
export const CONTROL_FIELDS = { ...CONTROL_MUTABLE_FIELDS, ...CONTROL_IMMUTABLE_FIELDS } as const;
