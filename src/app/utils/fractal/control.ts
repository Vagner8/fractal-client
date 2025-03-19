import { FormControl, FormRecord } from '@angular/forms';
import { ConstControlMutable } from '@constants';
import { IControl, IControlDto, ControlForm, FractalInitOptions, ConstControlMutableType } from '@types';
import { isConstControlMutableType } from '../guards';
import { deleteSubstring } from '../common';

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
          if (isConstControlMutableType(key)) {
            this.dto[key] = value[key];
          }
        }
      });
    }
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
    this.dto.data = deleteSubstring(this.dto.data, data);
    this.getFromControl('data').setValue(this.dto.data);
    return this;
  }
}
