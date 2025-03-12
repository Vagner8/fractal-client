import { IControlsDto, IFractalDto, FractalsDto, IFractal } from '@types';
import { v4 } from 'uuid';
import { ControlDto } from './control-dto';
import { ConstControlsOrder, ConstIndicators, ConstOrder } from '@constants';

export class FractalDto implements IFractalDto {
  id: string;
  parentId: string;
  controls: IControlsDto;
  fractals: FractalsDto | null;

  constructor(parent: IFractal) {
    this.id = v4();
    this.parentId = parent.dto.id;
    this.controls = this.createRequiredControlsDto(parent);
    this.fractals = {};
  }

  private createControlDto(indicator: string): ControlDto {
    const data = Object.keys(ConstControlsOrder).includes(indicator)
      ? [...Object.keys(ConstOrder), ConstIndicators.Cursor].join(':')
      : '';
    return new ControlDto(this.id, { data, indicator });
  }

  private createRequiredControlsDto(parent: IFractal): IControlsDto {
    const indicators = parent.controls.getAndSplitControlData('Occ');
    return Object.fromEntries(indicators.map(indicator => [indicator, this.createControlDto(indicator)]));
  }
}
