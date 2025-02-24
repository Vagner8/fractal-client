import { Indicators } from '@types';
import { constant } from '@utils';

export const ConstSort = constant(['SortChildren', 'SortControls', 'SortChildrenControls'] as const);
export const ConstIndicators = constant(['Icon', 'Cursor', 'Position'] as Indicators[]);
