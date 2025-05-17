import { FormControl, FormRecord } from '@angular/forms';
import { CControlMutable, CWords } from '@constants';
import {
  IControl,
  IControlDto,
  ControlForm,
  IFractal,
  ConstControlMutableType,
  IDataSplitState,
  IBoolState,
} from '@types';
import { BoolState } from '../states';
import { isConstControlMutableType } from 'app/utils/guards';
import { DataSplitState } from '../states/data-split-state';

export class Control implements IControl {
  form = this.createForm();
  dataSplit: IDataSplitState;
  fullEditMode: IBoolState;

  constructor(
    public dto: IControlDto,
    public parent: IFractal
  ) {
    this.syncFormWithDto();
    this.dataSplit = new DataSplitState(this);
    this.fullEditMode = new BoolState(false);
  }

  set(value: string): IControl {
    this.dto.data = value;
    this.getFromControl('data').setValue(value);
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
      this.parent.cursor !== CWords.New && this.parent.updateControls.pushUnique(this.dto);
      for (const key in CControlMutable) {
        if (isConstControlMutableType(key)) {
          this.dto[key] = value[key];
        }
      }
    });
  }
}
