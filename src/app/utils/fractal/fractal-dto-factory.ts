import { ControlsDto, FractalDto, FractalsDto } from '@types';
import { v4 } from 'uuid';

export class FractalDtoFactory implements FractalDto {
  id: string;
  controls: ControlsDto;
  fractals: FractalsDto | null;

  constructor(public parentId: string) {
    this.id = v4();
    this.controls = {};
    this.fractals = {};
  }
}
