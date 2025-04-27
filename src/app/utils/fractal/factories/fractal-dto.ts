import { IControlsDto, IFractalDto, FractalsDto } from '@types';
import { v4 } from 'uuid';

export class FractalDto implements IFractalDto {
  id: string;
  fractals: FractalsDto | null;

  constructor(
    public parentId: string,
    public controls: IControlsDto = {}
  ) {
    this.id = v4();
    this.fractals = {};
  }
}
