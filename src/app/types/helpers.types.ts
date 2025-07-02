import { APP_FRACTALS, INDICATORS } from '@constants';
import { Children, ConstantsValues, ControlsDto } from '@types';

export type SearchControlsProp = ConstantsValues<typeof INDICATORS> | [string];
export type SearchFractalsProp = ConstantsValues<typeof APP_FRACTALS> | [string];

export type SearchControls<T> = (search: SearchControlsProp, controlsDto: ControlsDto) => T;
export type SearchFractals<T> = (search: SearchFractalsProp, children?: Children) => T;
