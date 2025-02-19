import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlFormKeys, ConstControlKeys } from '@constants';

export type ControlForm = FormRecord<FormControl>;
export type ControlDto = ControlEditableFields & ControlNoneEditableFields;
export type ControlsDto = Record<string, ControlDto>;
export type ControlFormRecord = Record<keyof ControlEditableFields, FormControl>;
export type ControlEditableFields = Record<(typeof ConstControlFormKeys.values)[number], string>;
export type ControlNoneEditableFields = Record<(typeof ConstControlKeys.values)[number], string>;
