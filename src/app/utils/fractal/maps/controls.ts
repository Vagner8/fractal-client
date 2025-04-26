import { IFractal, FractalInitOptions, IControl, SearchControlData, IControls, AppError } from '@types';
import { Control } from '../control';
import { CIndicatorDuplicationError } from '@constants';
import { ControlFactory } from 'app/utils/common';

export class Controls extends Map<string, IControl> implements IControls {
  parent: IFractal;

  constructor(fractal: IFractal, options: FractalInitOptions = { syncFormWithDto: false }) {
    super();
    const { dto, form } = fractal;
    this.parent = fractal;
    Object.entries(dto.controls).forEach(([key, controlDto]) => {
      const control = new Control(controlDto, fractal, options);
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

  getOneLikeStrings(search: SearchControlData): string[] {
    return this.getOne(search)?.toStrings ?? [];
  }

  getOneLikeNumbers(search: SearchControlData): number[] {
    return this.getOne(search)?.toNumbers ?? [];
  }

  getOneAutoCreation(indicator: string): [IControl, boolean] {
    const existedControl = this.get(indicator);
    if (existedControl) {
      return [existedControl, false];
    } else {
      const newControl = ControlFactory(this.parent, { indicator });
      this.set(indicator, newControl);
      return [newControl, true];
    }
  }
}
