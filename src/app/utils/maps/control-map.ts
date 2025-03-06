import { IControl, IControlMap } from '@types';
import { ConstIndicators } from '@constants';
import { AppMap } from './app-map';

export class ControlMap extends AppMap<IControl> implements IControlMap {
  getControlData(indicator: keyof typeof ConstIndicators | string[]): string {
    const control = this.get(typeof indicator === 'string' ? indicator : indicator[0]);
    return control ? control.dto.data : '';
  }

  getControlDataAndSplit(indicator: keyof typeof ConstIndicators | string[]): string[] {
    const data = this.getControlData(indicator);
    return data ? data.split(':') : [];
  }
}
