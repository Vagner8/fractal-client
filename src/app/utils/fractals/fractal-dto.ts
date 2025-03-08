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
    this.controls = this.createControlsDto();
    this.fractals = {};
  }

  private createControlsDto(): IControlsDto {
    const controlsDto = Object.fromEntries(
      Object.values(ConstOrder).map(indicator => [indicator, new ControlDto(this.id).setIndicator([indicator])])
    );
    controlsDto[ConstIndicators.Cursor] = new ControlDto(this.id).setIndicator('Cursor');
    return controlsDto;
  }
}
