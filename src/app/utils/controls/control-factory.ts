import { signal } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutableKeys } from '@constants';
import { Control, ControlDto, ControlForm, ControlMutableDto, ControlMutableKeys, FractalInitOptions } from '@types';

export class ControlFactory implements Control {
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

  get(key: keyof ControlDto): string {
    return this.dto[key];
  }

  update(): ControlDto {
    for (const key in ConstControlMutableKeys) {
      const form = this.form.controls[key];
      if (form.dirty) this.dto[key as keyof ControlMutableDto] = form.value;
    }
    return this.dto;
  }

  getFormControl(indictor: ControlMutableKeys): FormControl {
    return this.form.controls[indictor];
  }

  getDataAndSplit(): string[] {
    return this.dto.data.split(':');
  }
}
