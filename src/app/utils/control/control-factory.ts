import { signal } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutableKeys } from '@constants';
import { Control, ControlDto, ControlForm } from '@types';

export class ControlFactory implements Control {
  form: ControlForm;
  $selected = signal(false);
  $formVisible = signal(true);

  constructor(public dto: ControlDto) {
    this.form = new FormRecord(
      Object.fromEntries(Object.values(ConstControlMutableKeys).map(key => [key, new FormControl(this.dto[key])]))
    );
  }
}
