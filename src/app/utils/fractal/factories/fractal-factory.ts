import { FractalFactoryOptions, IControl, IFractal } from '@types';
import { Fractal } from './fractal';
import { FractalDto } from './fractal-dto';
import { ControlFactory } from './control-factory';
import { CIndicators } from '@constants';

export const FractalFactory = (parent: IFractal, options?: FractalFactoryOptions): IFractal => {
  const fractal = new Fractal(new FractalDto(parent.dto.id), parent);

  if (options?.controlsData) {
    const newControls: IControl[] = [];
    for (const controlData of options.controlsData) {
      const newControl = ControlFactory(fractal, controlData);
      newControls.push(newControl);
    }
    fractal.newControls.set(newControls);
  }

  if (options?.fractalsData) {
    options.fractalsData.forEach((fractalData, index) => {
      const newFractal = FractalFactory(fractal);
      let cursor = '';
      for (const controlData of fractalData.controlsData) {
        if (controlData.indicator === CIndicators.Cursor) {
          cursor = controlData.data;
        }
        const newControl = ControlFactory(fractal, controlData);
        newFractal.controls.setOne(newControl);
      }
      newFractal.cursor = cursor || String(index + 1);
      newFractal.controls.setOne(
        ControlFactory(newFractal, { data: newFractal.cursor, indicator: CIndicators.Cursor })
      );
      fractal.fractals.setOne(newFractal.cursor || String(index + 1), newFractal);
    });
  }

  if (options?.indicators) {
    const newControls: IControl[] = [];
    for (const indicator of options.indicators) {
      const newControl = ControlFactory(fractal, { indicator });
      newControls.push(newControl);
    }
    fractal.newControls.set(newControls);
  }

  return fractal;
};
