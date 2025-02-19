import { FormControl, FormGroup } from '@angular/forms';
import { ConstControlFormKeys } from '@constants';
import { ControlDto, ControlEditableFields, ControlForm } from '@types';
import { v4 } from 'uuid';

export const newControlForm = (): ControlForm =>
  new FormGroup(
    ConstControlFormKeys.strings.reduce((acc: Record<string, FormControl>, key) => {
      acc[key] = new FormControl('');
      return acc;
    }, {})
  );

export const createControlDto = (form: ControlForm, parentId: string): ControlDto => {
  const controlFormKeys: ControlEditableFields = ConstControlFormKeys.values.reduce((acc, key) => {
    acc[key] = form.controls[key].value;
    return acc;
  }, {} as ControlEditableFields);

  return {
    id: v4(),
    parentId,
    ...controlFormKeys,
  };
};
