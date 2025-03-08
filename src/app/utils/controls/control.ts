import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutableKeys, ConstSeparator } from '@constants';
import { IControl, IControlDto, ControlForm, IControlMutableDto, FractalInitOptions } from '@types';

export class Control implements IControl {
  form: ControlForm;

  constructor(
    public dto: IControlDto,
    option?: FractalInitOptions
  ) {
    this.form = new FormRecord(
      Object.fromEntries(Object.values(ConstControlMutableKeys).map(key => [key, new FormControl(this.dto[key])]))
    );
    if (option?.syncFormWithDto) {
      this.form.valueChanges.subscribe(value => {
        for (const key in ConstControlMutableKeys) {
          this.dto[key as keyof IControlMutableDto] = value[key];
        }
      });
    }
  }

  syncWithForm(): IControlDto {
    for (const key in ConstControlMutableKeys) {
      const form = this.form.controls[key];
      if (form.dirty) this.dto[key as keyof IControlMutableDto] = form.value;
    }
    return this.dto;
  }

  getFromControl(name: keyof typeof ConstControlMutableKeys): FormControl {
    return this.form.controls[name];
  }

  updateSplitData(value: string): IControl {
    let dataArr = this.dto.data.split(ConstSeparator);
    if (dataArr.includes(value)) throw new Error(`Control with name ${value} already exist`);
    if (this.dto.data) {
      dataArr.push(value);
    } else {
      dataArr = [value];
    }
    const dataStr = dataArr.join(ConstSeparator);
    this.dto.data = dataStr;
    this.getFromControl('data').setValue(dataStr);
    return this;
  }
}
