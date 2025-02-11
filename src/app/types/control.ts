import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ControlDto = ControlFormKeys & ControlKeys;
export type ControlsDto = Record<string, ControlDto>;
export type NewControlFrom = FormArray<FormGroup<Record<string, FormControl>>>;
export type ControlFromRecord = Record<keyof ControlFormKeys, FormControl>;

export interface ControlFormKeys {
  data: string;
  input: string;
  indicator: string;
}

export interface ControlKeys {
  id: string;
  parentId: string;
}
