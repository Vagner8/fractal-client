import { IControlsDto, IFractalDto, FractalsDto, IFractal } from '@types';
import { v4 } from 'uuid';
import { ControlDto } from './control-dto';
import { ConstControlFields } from '@constants';

export class FractalDto implements IFractalDto {
  id: string;
  parentId: string;
  controls: IControlsDto;
  fractals: FractalsDto | null;

  constructor(parent: IFractal) {
    this.id = v4();
    this.parentId = parent.dto.id;
    this.controls = this.createControlsDto(parent);
    this.fractals = {};
  }

  private createControlsDto(parent: IFractal): IControlsDto {
    const parentOcc = parent.controls.getAndSplitControlData('Occ');
    const controls: IControlsDto = Object.fromEntries(
      parentOcc.map(indicator => [indicator, new ControlDto(this.id, { indicator })])
    );

    controls['Oc'] = new ControlDto(this.id, {
      data: '',
      field: ConstControlFields.Text,
      indicator: 'Oc',
    });

    controls['Occ'] = new ControlDto(this.id, {
      data: '',
      field: ConstControlFields.Text,
      indicator: 'Occ',
    });

    return controls;
  }
}
