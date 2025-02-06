export type ControlsDto = Record<string, ControlDto>;

export type ControlDto = {
  id: string;
  data: string;
  input: string;
  parentId: string;
  indicator: string;
};
