export const ConstOrder = {
  Oc: 'Order children',
  Ooc: 'Order own controls',
  Occ: 'Order children controls',
} as const;
export const ConstIndicators = { Icon: 'Icon', Cursor: 'Cursor', ...ConstOrder } as const;
export const ConstSplitIndicators = { ...ConstOrder } as const;
