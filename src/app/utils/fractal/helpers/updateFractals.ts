import { ConstControlFields, ConstControlMutable } from '@constants';
import { IControl, IControlDto, IFractal } from '@types';
import { deleteSubstring } from 'app/utils/common';
import { isConstControlMutableType } from 'app/utils/guards';

export const updateFractals = (fractals: IFractal[]): IControlDto[] => {
  const acc: IControlDto[] = [];
  fractals.forEach(fractal => {
    for (const control of fractal.controls.values()) {
      if (control.form.dirty) {
        if (fractal.$fullEditMode()) {
          acc.push(updateAllControlFields(control));
        } else {
          control.getFromControl('data').dirty && acc.push(updateControlDataField(control));
        }
        control.form.markAsPristine();
      }
    }
  });
  return acc;
};

const updateControlDataField = (control: IControl): IControlDto => {
  const { data, field } = ConstControlMutable;
  const { value } = control.form.controls[data];
  if (control.form.controls[field].value === ConstControlFields.Select) {
    control.dto.data = `${value}:${deleteSubstring(control.dto.data, value)}`;
  } else {
    control.dto.data = value;
  }
  return control.dto;
};

const updateAllControlFields = (control: IControl): IControlDto => {
  for (const key in ConstControlMutable) {
    if (isConstControlMutableType(key)) {
      const form = control.form.controls[key];
      if (form.dirty) control.dto[key] = form.value;
    }
  }
  return control.dto;
};
