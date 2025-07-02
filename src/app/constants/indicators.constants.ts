export const ORDERS = { OC: 'Oc', OCC: 'Occ' } as const;
export const INDICATORS = { ICON: 'Icon', NAME: 'Name', ...ORDERS } as const;
export const INDICATORS_INTERNAL = { ...ORDERS };
