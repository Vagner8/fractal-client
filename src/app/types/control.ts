import { FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';
import { ConstControlFormKeys, ConstControlKeys } from '@constants';

export type NewControlForm = FormRecord<FormControl>;
export type ControlDto = ControlForm & ControlKeys;
export type ControlsDto = Record<string, ControlDto>;
export type NewControlFrom = FormArray<FormGroup<Record<string, FormControl>>>;
export type ControlFromRecord = Record<keyof ControlForm, FormControl>;
export type ControlForm = Record<(typeof ConstControlFormKeys.values)[number], string>;
export type ControlKeys = Record<(typeof ConstControlKeys.values)[number], string>;
