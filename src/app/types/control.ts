import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ConstControlFormKeys, ConstControlKeys } from '@constants';

export type ControlDto = ControlFormKeys & ControlKeys;
export type ControlsDto = Record<string, ControlDto>;
export type NewControlFrom = FormArray<FormGroup<Record<string, FormControl>>>;
export type ControlFromRecord = Record<keyof ControlFormKeys, FormControl>;
export type ControlFormKeys = Record<(typeof ConstControlFormKeys.values)[number], string>;
export type ControlKeys = Record<(typeof ConstControlKeys.values)[number], string>;
