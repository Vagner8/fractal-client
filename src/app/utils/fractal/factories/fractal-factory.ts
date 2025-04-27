import { IControl, IFractal } from '@types';
import { Fractal } from './fractal';
import { FractalDto } from './fractal-dto';
import { CInternalIndicators, CWords } from '@constants';
import { ControlFactory } from './control-factory';

export const FractalFactory = (parent: IFractal): IFractal => {
  const occ = parent.controls.getOne('Occ');
  const fractal = new Fractal(new FractalDto(parent.dto.id), parent);

  if (occ) {
    const newControls: IControl[] = [];
    for (const indicator of occ.toStrings) {
      if (!Object.hasOwn(CInternalIndicators, indicator)) {
        const newControl = ControlFactory(fractal, { indicator });
        fractal.cursor === CWords.New && newControl.fullEditMode.set(true);
        newControls.push(newControl);
      }
    }
    fractal.newControls.set(newControls);
  } else {
    fractal.newControls.push(ControlFactory(fractal));
  }

  return fractal;
};
