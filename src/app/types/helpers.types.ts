import { APP_FRACTALS, CONTROL_CURSORS } from '@constants';
import { Children, ConstantsValues, Controls } from '@types';

export type SearchControlsProp = ConstantsValues<typeof CONTROL_CURSORS> | [string];
export type SearchFractalsProp = ConstantsValues<typeof APP_FRACTALS> | [string];

export type SearchControls<T> = (search: SearchControlsProp, controls: Controls) => T;
export type SearchFractals<T> = (search: SearchFractalsProp, children?: Children) => T;
