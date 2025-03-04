export const ConstOrder = {
  'Order children': 'Order children',
  'Order own controls': 'Order own controls',
  'Order children controls': 'Order children controls',
} as const;
export const ConstIndicators = { Icon: 'Icon', Cursor: 'Cursor', ...ConstOrder } as const;
export const ConstSplitIndicators = { ...ConstOrder } as const;
