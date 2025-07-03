export const CONTROL_ORDERS_CURSORS = { OC: 'Oc', OCC: 'Occ' } as const;
export const CONTROL_COMMON_CURSORS = { ICON: 'Icon', NAME: 'Name' } as const;
export const CONTROL_CURSORS = { ...CONTROL_ORDERS_CURSORS, ...CONTROL_COMMON_CURSORS } as const;
export const CONTROL_MUTABLE = { CURSOR: 'cursor', TYPE: 'type', DATA: 'data' } as const;
export const CONTROL_TYPES = {
  SELECT: 'Select',
  STRING: 'String',
} as const;
