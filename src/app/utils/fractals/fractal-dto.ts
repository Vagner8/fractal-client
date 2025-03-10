import { ConstIndicators, ConstOrder } from '@constants';
import { IControlsDto, IFractalDto, FractalsDto, IFractal } from '@types';
import { v4 } from 'uuid';
import { ControlDto } from '../controls/control-dto';

export class FractalDto implements IFractalDto {
  id: string;
  parentId: string;
  controls: IControlsDto;
  fractals: FractalsDto | null;

  constructor(parent: IFractal) {
    this.id = v4();
    this.parentId = parent.dto.id;
    this.controls = this.createRequiredControls(parent);
    this.fractals = {};
  }

  private createControlDto(indicator: string): ControlDto {
    const controlDto = new ControlDto(this.id);
    controlDto.indicator = indicator;
    if (indicator === ConstOrder.Occ) {
      controlDto.data = ConstIndicators.Cursor;
    }
    return controlDto;
  }

  private createRequiredControls(parent: IFractal): IControlsDto {
    const indicators = parent.controls.getAndSplitControlData('Occ');
    indicators.push(ConstIndicators.Cursor);
    return Object.fromEntries(indicators.map(indicator => [indicator, this.createControlDto(indicator)]));
  }
}
