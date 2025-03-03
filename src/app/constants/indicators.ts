export const ConstSort = {
  'Sort Children': 'Sort children',
  'Sort own controls': 'Sort own controls',
  'Sort children controls': 'Sort children controls',
} as const;
export const ConstIndicators = { Icon: 'Icon', Cursor: 'Cursor', ...ConstSort } as const;
export const ConstSplitIndicators = { ...ConstSort } as const;
