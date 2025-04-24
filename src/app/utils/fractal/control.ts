import { FormControl, FormRecord } from '@angular/forms';
import { CControlMutable } from '@constants';
import { IControl, IControlDto, ControlForm, FractalInitOptions, ConstControlMutableType, IFractal } from '@types';
import { isConstControlMutableType } from '../guards';
import { deleteSubstring } from '../common';

export class Control implements IControl {
  form: ControlForm;

  constructor(
    public dto: IControlDto,
    public parent: IFractal,
    option?: FractalInitOptions
  ) {
    this.form = this.createForm();
    option?.syncFormWithDto && this.syncFormWithDto();
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

  map<T>(func: (value: string) => T): T[] {
    const result: T[] = [];
    this.forEach(value => result.push(func(value)));
    return result;
  }

  reduce<T>(func: (acc: T, value: string) => T, initialValue: T): T {
    let result: T = initialValue;
    this.forEach(value => (result = func(result, value)));
    return result;
  }

  forEach(func: (value: string) => void): void {
    const { data } = this.dto;
    const length = data.length;
    let start = 0;
    for (let i = 0; i <= length; i++) {
      if (data[i] === ':' || i === length) {
        func(data.slice(start, i));
        start = i + 1;
      }
    }
  }

  private createForm(): ControlForm {
    return new FormRecord(
      Object.fromEntries(Object.values(CControlMutable).map(key => [key, new FormControl(this.dto[key])]))
    );
  }

  private syncFormWithDto(): void {
    this.form.valueChanges.subscribe(value => {
      this.parent.touchedControls.add(this);
      for (const key in CControlMutable) {
        if (isConstControlMutableType(key)) {
          this.dto[key] = value[key];
        }
      }
    });
  }
}
