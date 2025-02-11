import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ControlDto = ControlEditableKeys & ControlKeys;
export type ControlsDto = Record<string, ControlDto>;
export type NewControlFrom = FormArray<FormGroup<Record<string, FormControl>>>;

export interface ControlEditableKeys {
  data: string;
  input: string;
  indicator: string;
}

export interface ControlKeys {
  id: string;
  parentId: string;
}
