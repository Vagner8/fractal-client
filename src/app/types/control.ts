export const ControlInputs = {
  Text: 'Text',
  Select: 'Select',
  Organizer: 'Organizer',
} as const;

export const ControlKeys: Record<keyof ControlDto, keyof ControlDto> = {
  id: 'id',
  data: 'data',
  input: 'input',
  parentId: 'parentId',
  indicator: 'indicator',
} as const;

export type ControlsDto = Record<string, ControlDto>;

export type ControlDto = {
  id: string;
  data: string;
  input: string;
  parentId: string;
  indicator: string;
};
