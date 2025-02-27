import { signal } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutableKeys } from '@constants';
import { Control, ControlDto, ControlForm, ControlMutableKeys } from '@types';

export class ControlFactory implements Control {
  form: ControlForm;
  $selected = signal(false);

  constructor(public dto: ControlDto) {
    this.form = new FormRecord(
      Object.fromEntries(Object.values(ConstControlMutableKeys).map(key => [key, new FormControl(this.dto[key])]))
    );
  }

  get(key: keyof ControlDto): string {
    return this.dto[key];
  }

  getDataAndSplit(): string[] {
    return this.dto.data.split(':');
  }

  getFormControl(indictor: ControlMutableKeys): FormControl {
    return this.form.controls[indictor];
  }
}
