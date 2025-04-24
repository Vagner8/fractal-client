export const COrders = { Oc: 'Oc', Occ: 'Occ' } as const;
export const CIndicators = { Icon: 'Icon', Name: 'Name', Cursor: 'Cursor', ...COrders } as const;
export const CSplitIndicators = { ...COrders } as const;
