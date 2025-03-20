import { ConstControlFields, ConstControlMutable } from '@constants';
import { IControl, IControlDto, IFractal, IFractalDto } from '@types';
import { deleteSubstring } from 'app/utils/common';
import { isConstControlMutableType } from 'app/utils/guards';
import { addFractal } from './addFractal';

export const updateFractals = (
  parent: IFractal,
  fractals: IFractal[]
): { orderChildren: IControlDto | undefined; fractalsToAdd: IFractalDto[]; controlsToUpdate: IControlDto[] } => {
  const orderChildren = parent.controls.getKnown('Oc');
  const fractalsToAdd: IFractalDto[] = [];
  const controlsToUpdate: IControlDto[] = [];
  [parent, ...fractals].forEach(fractal => {
    if (!fractal.form.dirty) return;
    if (fractal.isNew && orderChildren) {
      fractalsToAdd.push(addFractal({ parent, fractal, orderChildren }));
    }
    for (const control of fractal.controls.values()) {
      if (control.form.dirty) {
        if (fractal.$fullEditMode()) {
          controlsToUpdate.push(updateAllControlFields(control));
        } else {
          control.getFromControl('data').dirty && controlsToUpdate.push(updateControlDataField(control));
        }
        control.form.markAsPristine();
      }
    }
  });
  return { orderChildren: orderChildren?.dto, fractalsToAdd, controlsToUpdate };
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
