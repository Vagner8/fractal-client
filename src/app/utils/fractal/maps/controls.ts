import {
  IFractal,
  FractalInitOptions,
  ConstIndicatorsType,
  IControl,
  IndicatorData,
  IControls,
  AppError,
} from '@types';
import { Control } from '../control';
import { ControlFactory, getIndicatorData } from '../../common';
import { CIndicatorDuplicationError } from '@constants';

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

  setNew(control: IControl): [IControl, AppError | null] {
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

  getOrCreate(indicator: string): [IControl, boolean] {
    const existedControl = this.get(indicator);
    if (existedControl) {
      return [existedControl, false];
    } else {
      const newControl = ControlFactory(this.parent, { indicator });
      this.set(indicator, newControl);
      return [newControl, true];
    }
  }

  getData(indicator: IndicatorData): string {
    const control = this.get(getIndicatorData(indicator));
    return control ? control.dto.data : '';
  }

  getKnown(indicator: ConstIndicatorsType): IControl | undefined {
    return this.get(indicator);
  }

  getSplitData(indicator: IndicatorData): { strings: string[]; numbers: number[] } {
    const data = this.getData(indicator);
    const strings: string[] = [];
    const numbers: number[] = [];
    let start = 0;
    for (let i = 0; i <= data.length; i++) {
      if (data[i] === ':' || i === data.length) {
        const cursor = data.slice(start, i);
        strings.push(cursor);
        numbers.push(Number(cursor));
        start = i + 1;
      }
    }
    return { strings, numbers };
  }
}
