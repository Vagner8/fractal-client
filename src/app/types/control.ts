import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ControlsDto = Record<string, ControlDto>;
export type NewControlFrom = FormArray<FormGroup<Record<string, FormControl>>>;

export type ControlDto = {
  id: string;
  data: string;
  input: string;
  parentId: string;
  indicator: string;
};
