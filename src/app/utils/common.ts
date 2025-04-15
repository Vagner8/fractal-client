import { IControl, IFractal, IndicatorData } from '@types';
import { Control } from './fractal/control';
import { ControlDto } from './fractal/dto/control-dto';
import { Fractal } from './fractal';
import { FractalDto } from './fractal/dto/fractal-dto';

export const getIndicatorData = (indicatorData: IndicatorData): string =>
  typeof indicatorData === 'string' ? indicatorData : indicatorData[0];

export const deleteSubstring = (str: string, substr: string): string => {
  return str
    .split(':')
    .filter(char => char !== substr)
    .join(':');
};

export const ControlFactory = (parentId: string): IControl =>
  new Control(new ControlDto(parentId), { syncFormWithDto: true });

export const FractalFactory = (parent: IFractal): IFractal =>
  new Fractal(new FractalDto(parent), parent, { syncFormWithDto: true });
