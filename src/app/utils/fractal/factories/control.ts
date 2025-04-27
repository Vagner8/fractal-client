import { FormControl, FormRecord } from '@angular/forms';
import { CControlMutable } from '@constants';
import {
  IControl,
  IControlDto,
  ControlForm,
  FractalInitOptions,
  ConstControlMutableType,
  IFractal,
  IBoolState,
} from '@types';
import { BoolState } from '../states';
import { isConstControlMutableType } from 'app/utils/guards';

export class Control implements IControl {
  form: ControlForm;
  fullEditMode: IBoolState;
  private readonly dataSet: Set<string>;

  constructor(
    public dto: IControlDto,
    public parent: IFractal,
    option?: FractalInitOptions
  ) {
    this.form = this.createForm();
    this.fullEditMode = new BoolState(false);
    option?.syncFormWithDto && this.syncFormWithDto();
    this.dataSet = new Set(this.toStrings);
  }

  get toStrings(): string[] {
    return this.dto.data.split(':');
  }

  get toNumbers(): number[] {
    const numbers: number[] = [];
    const { data } = this.dto;
    let start = 0;
    for (let i = 0; i <= data.length; i++) {
      if (data[i] === ':' || i === data.length) {
        numbers.push(Number(data.slice(start, i)));
        start = i + 1;
      }
    }
    return numbers;
  }

  push(value: string): IControl {
    this.dataSet.add(value);
    const data = Array.from(this.dataSet).join(':');
    this.dto.data = data;
    this.getFromControl('data').setValue(data);
    return this;
  }

  getFromControl(name: ConstControlMutableType): FormControl {
    return this.form.controls[name];
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
