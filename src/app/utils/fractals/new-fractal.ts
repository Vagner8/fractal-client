import { ControlsDto, IFractal, FractalInitOptions } from '@types';
import { Fractal } from './fractal';
import { FractalDtoFactory } from './fractal-dto-factory';
import { ConstControlInputs, ConstIndicators } from '@constants';
import { v4 } from 'uuid';

const cloneControlsDto = (controlsDto: ControlsDto): ControlsDto => {
  const clone: ControlsDto = {};
  for (const indicator in controlsDto) {
    const { input, parentId } = controlsDto[indicator];
    clone[indicator] = {
      id: v4(),
      data: '',
      input,
      parentId,
      indicator,
    };
  }
  return clone;
};

export const NewFractal = (parent: IFractal, options: FractalInitOptions): IFractal => {
  const dto = new FractalDtoFactory(parent.dto.id);
  const firstFractal = parent.fractals.first;
  firstFractal
    ? cloneControlsDto(firstFractal.dto.controls)
    : {
        [ConstIndicators.Cursor]: {
          id: v4(),
          data: '',
          input: ConstControlInputs.Text,
          parentId: parent.dto.id,
          indicator: ConstIndicators.Cursor,
        },
      };

  return new Fractal(dto, parent, options);
};
