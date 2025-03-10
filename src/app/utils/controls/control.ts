import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutable } from '@constants';
import {
  IControl,
  IControlDto,
  ControlForm,
  IControlMutableDto,
  FractalInitOptions,
  ConstControlMutableType,
} from '@types';

export class Control implements IControl {
  form: ControlForm;

  constructor(
    public dto: IControlDto,
    option?: FractalInitOptions
  ) {
    this.form = new FormRecord(
      Object.fromEntries(Object.values(ConstControlMutable).map(key => [key, new FormControl(this.dto[key])]))
    );
    if (option?.syncFormWithDto) {
      this.form.valueChanges.subscribe(value => {
        for (const key in ConstControlMutable) {
          this.dto[key as keyof IControlMutableDto] = value[key];
        }
      });
    }
  }

  syncWithForm(): IControlDto {
    for (const key in ConstControlMutable) {
      const form = this.form.controls[key];
      if (form.dirty) this.dto[key as keyof IControlMutableDto] = form.value;
    }
    return this.dto;
  }

  getFromControl(name: ConstControlMutableType): FormControl {
    return this.form.controls[name];
  }

  pushSplitData(data: string): IControl {
    this.dto.data = this.dto.data ? `${this.dto.data}:${data}` : data;
    this.getFromControl('data').setValue(this.dto.data);
    return this;
  }

  deleteSplitData(data: string): IControl {
    this.dto.data = this.dto.data
      .split(':')
      .filter(indicator => indicator !== data)
      .join(':');
    this.getFromControl('data').setValue(this.dto.data);

    return this;
  }
}
