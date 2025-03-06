import { signal } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutableKeys } from '@constants';
import { IControl, ControlDto, ControlForm, ControlMutableDto, FractalInitOptions } from '@types';

export class Control implements IControl {
  form: ControlForm;
  $selected = signal(false);

  constructor(
    public dto: ControlDto,
    option?: FractalInitOptions
  ) {
    this.form = new FormRecord(
      Object.fromEntries(Object.values(ConstControlMutableKeys).map(key => [key, new FormControl(this.dto[key])]))
    );
    if (option?.syncFormWithDto) {
      this.form.valueChanges.subscribe(value => {
        for (const key in ConstControlMutableKeys) {
          this.dto[key as keyof ControlMutableDto] = value[key];
        }
      });
    }
  }

  update(): ControlDto {
    for (const key in ConstControlMutableKeys) {
      const form = this.form.controls[key];
      if (form.dirty) this.dto[key as keyof ControlMutableDto] = form.value;
    }
    return this.dto;
  }

  getFromControl(name: keyof typeof ConstControlMutableKeys): FormControl {
    return this.form.controls[name];
  }
}
