import { FormControl, FormRecord } from '@angular/forms';
import { CControlMutable } from '@constants';
import {
  IControl,
  IControlDto,
  ControlForm,
  IFractal,
  ConstControlMutableType,
  IDataSplitState,
  IBoolState,
  IControlMutableDto,
} from '@types';
import { BoolState } from '../states';
import { isConstControlMutableType } from 'app/utils/guards';
import { DataSplitState } from '../states/data-split.state';
import { ControlDto } from './control-dto.factory';

interface ControlProps {
  parent: IFractal;
  dto?: ControlDto;
  mutableFields?: Partial<IControlMutableDto>;
}

export class Control implements IControl {
  dto: IControlDto;
  form: ControlForm;
  parent: IFractal;
  dataSplit: IDataSplitState;
  fullEditMode: IBoolState;

  constructor({ dto, parent, mutableFields }: ControlProps) {
    this.dto = dto || new ControlDto(parent.dto.id, mutableFields);
    this.form = this.createForm();
    this.parent = parent;
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
      for (const key in CControlMutable) {
        if (isConstControlMutableType(key)) {
          this.dto[key] = value[key];
        }
      }
    });
  }
}
