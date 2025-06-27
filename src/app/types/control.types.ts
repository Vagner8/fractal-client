export type ControlsDto = Record<string, ControlDto>;
export type ControlType = 'String' | 'String[]';

export interface ControlDto {
  id: string;
  data: string;
  type: ControlType;
  parentId: string;
  indicator: string;
}
