import { IControl, IControlMutableDto, IControlsDto, IFractal, IndicatorData } from '@types';
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

export const ControlFactory = (parent: IFractal, values?: Partial<IControlMutableDto>): IControl =>
  new Control(new ControlDto(parent.dto.id, values), parent, { syncFormWithDto: true });

export const FractalFactory = (parent: IFractal): IFractal => {
  const controlsDto: IControlsDto = {};
  const occ = parent.controls.getKnown('Occ');
  const fractal = new Fractal(new FractalDto(parent.dto.id, controlsDto), parent, { syncFormWithDto: true });

  if (occ) {
    const controls: IControl[] = [];
    const firstChild = parent.fractals.values().next().value;
    if (firstChild) {
      for (const { dto } of firstChild.controls.values()) {
        const { field, indicator } = dto;
        controls.push(ControlFactory(fractal, { field, indicator }));
      }
    }
    fractal.newControls.set(controls);
  } else {
    fractal.newControls.push(ControlFactory(fractal));
    fractal.fullEditMode.set(true);
  }

  return fractal;
};
