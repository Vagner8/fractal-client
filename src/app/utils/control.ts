import { FormControl, FormGroup } from '@angular/forms';
import { ConstControlFormKeys } from '@constants';
import { ControlDto, ControlForm, Fractal, NewControlForm } from '@types';
import { v4 } from 'uuid';

export const newControlForm = (): NewControlForm =>
  new FormGroup(
    ConstControlFormKeys.strings.reduce((acc: Record<string, FormControl>, key) => {
      acc[key] = new FormControl('');
      return acc;
    }, {})
  );

export const createControlDto = (form: NewControlForm, parentId: string): ControlDto => {
  const controlFormKeys: ControlForm = ConstControlFormKeys.values.reduce((acc, key) => {
    acc[key] = form.controls[key].value;
    return acc;
  }, {} as ControlForm);

  return {
    id: v4(),
    parentId,
    ...controlFormKeys,
  };
};

export const addControlDto = (form: NewControlForm, control: ControlDto, fractal: Fractal): void => {
  fractal.dto.controls[control.indicator] = control;
  fractal.form.addControl(control.indicator, form);
};

export const addControlsDto = (forms: NewControlForm[], fractal: Fractal): ControlDto[] => {
  return forms.map(form => {
    const controlDto = createControlDto(form, fractal.dto.id);
    addControlDto(form, controlDto, fractal);
    return controlDto;
  });
};
