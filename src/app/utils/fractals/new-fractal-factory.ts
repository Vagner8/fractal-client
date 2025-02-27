import { ControlsDto, Fractal, FractalInitOptions } from '@types';
import { FractalFactory } from './fractal-factory';
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

export const NewFractalFactory = (parent: Fractal, options: FractalInitOptions): Fractal => {
  const dto = new FractalDtoFactory(parent.dto.id);
  dto.controls =
    parent.fractals.values.length > 0
      ? cloneControlsDto(parent.fractals.values[0].dto.controls)
      : {
          [ConstIndicators.Cursor]: {
            id: v4(),
            data: '',
            input: ConstControlInputs.Text,
            parentId: parent.dto.id,
            indicator: ConstIndicators.Cursor,
          },
        };

  return new FractalFactory(dto, parent, options);
};
