import { IFractal, FractalInitOptions, ConstIndicatorsType, IControl, IndicatorData, IControls } from '@types';
import { Control } from './control';
import { getIndicatorData } from '../common';

export class Controls extends Map<string, Control> implements IControls {
  constructor(fractal: IFractal, options: FractalInitOptions = { syncFormWithDto: false }) {
    super();
    const { dto, form } = fractal;
    Object.entries(dto.controls).forEach(([key, controlDto]) => {
      const control = new Control(controlDto, options);
      this.set(key, control);
      form.addControl(key, control.form);
    });
  }

  getKnown(indicator: ConstIndicatorsType): IControl | undefined {
    return this.get(indicator);
  }

  getControlData(indicator: IndicatorData): string {
    const control = this.get(getIndicatorData(indicator));
    return control ? control.dto.data : '';
  }

  getAndSplitControlData(indicator: IndicatorData): string[] {
    const data = this.getControlData(indicator);
    return data ? data.split(':') : [];
  }
}
