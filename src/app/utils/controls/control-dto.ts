import { ConstControlInputs } from '@constants';
import { IControlDto, IndicatorData } from '@types';
import { v4 } from 'uuid';
import { getIndicatorData } from '../common';

export class ControlDto implements IControlDto {
  id: string;
  data: string;
  input: string;
  indicator: string;

  constructor(public parentId: string) {
    this.id = v4();
    this.data = '';
    this.input = ConstControlInputs.Text;
    this.indicator = '';
  }

  setInput(input: keyof typeof ConstControlInputs): ControlDto {
    this.input = input;
    return this;
  }

  setIndicator(indicatorData: IndicatorData): ControlDto {
    this.indicator = getIndicatorData(indicatorData);
    return this;
  }
}
