import { IControl, IControlMap, IndicatorData } from '@types';
import { AppMap } from './app-map';
import { getIndicatorData } from '../common';
import { ConstIndicators } from '@constants';

export class ControlMap extends AppMap<IControl> implements IControlMap {
  getKnown(indicator: keyof typeof ConstIndicators): IControl | undefined {
    return this.get(indicator);
  }

  getControlData(indicator: IndicatorData): string {
    const control = this.get(getIndicatorData(indicator));
    return control ? control.dto.data : '';
  }

  getControlDataAndSplit(indicator: IndicatorData): string[] {
    const data = this.getControlData(indicator);
    return data ? data.split(':') : [];
  }
}
