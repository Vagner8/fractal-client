export const ConstControlsOrder = {
  Ooc: 'Order own controls',
  Occ: 'Order children controls',
} as const;
export const ConstOrder = {
  Oc: 'Order children',
  ...ConstControlsOrder,
} as const;
export const ConstIndicators = { Icon: 'Icon', Cursor: 'Cursor', ...ConstOrder } as const;
export const ConstSplitIndicators = { ...ConstOrder } as const;
export const ConstRequiredOrdersData = [ConstIndicators.Cursor, ...Object.keys(ConstOrder)] as const;
