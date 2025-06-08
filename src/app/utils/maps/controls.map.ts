import { IFractal, IControl, SearchControlData, IControls, AppError } from '@types';
import { CIndicatorDuplicationError } from '@constants';
import { Control } from '../factories';

export class ControlsMap extends Map<string, IControl> implements IControls {
  parent: IFractal;

  constructor(fractal: IFractal) {
    super();
    const { dto, form } = fractal;
    this.parent = fractal;
    Object.entries(dto.controls).forEach(([key, controlDto]) => {
      const control = new Control({ parent: fractal, dto: controlDto });
      this.set(key, control);
      form.addControl(key, control.form);
    });
  }

  setOne(control: IControl): [IControl, AppError | null] {
    const { dto, form } = control;
    if (this.has(dto.indicator)) {
      return [control, CIndicatorDuplicationError];
    } else {
      this.parent.form.setControl(dto.indicator, form);
      this.parent.dto.controls[dto.indicator] = control.dto;
      this.set(dto.indicator, control);
      return [control, null];
    }
  }

  getOne(search: SearchControlData): IControl | undefined {
    return this.get(typeof search === 'string' ? search : search[0]);
  }

  getOneData(search: SearchControlData): string {
    return this.getOne(search)?.dto.data ?? '';
  }

  getOneSplitable(search: SearchControlData): string[] {
    return this.getOne(search)?.dataSplit.strings ?? [];
  }

  getOneWithAutoCreation(indicator: string): [IControl, boolean] {
    const existedControl = this.get(indicator);
    if (existedControl) {
      return [existedControl, false];
    } else {
      const newControl = new Control({
        parent: this.parent,
        mutableFields: { indicator },
      });
      this.set(indicator, newControl);
      return [newControl, true];
    }
  }
}
