import { CONTROL_TYPES } from '@constants';
import { ConstantsValues } from './common.types';

export type ControlsDto = Record<string, ControlDto>;
export type ControlType = ConstantsValues<typeof CONTROL_TYPES>;

export interface ControlDto {
  id: string;
  data: string;
  type: ControlType;
  parentId: string;
  indicator: string;
}
