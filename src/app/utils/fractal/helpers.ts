import { FractalFactory } from 'app/utils/fractal';
import { Fractal, Fractals, FractalsDto } from '@types';
import { ConstSplitIndicators } from '@constants';

export const createFractalsRecursively = (fractalsDto: FractalsDto | null, parent: Fractal): Fractals | null => {
  if (!fractalsDto) return null;
  const result: Fractals = {};
  for (const indicator in fractalsDto) {
    const fractal = new FractalFactory({ parent, dto: fractalsDto[indicator] });
    fractal.fractals = createFractalsRecursively(fractalsDto[indicator].fractals, fractal);
    result[indicator] = fractal;
  }
  return result;
};

export const findFractalRecursively = (test: string, fractals: Fractals | null): Fractal | null => {
  if (fractals) {
    for (const key in fractals) {
      if (fractals[key].is(test) || fractals[key].dto.id === test) return fractals[key];
      const found = findFractalRecursively(test, fractals[key].fractals);
      if (found) return found;
    }
  }
  return null;
};

export const getFractalSort = (fractal: Fractal): string[] => {
  if (fractal.isItem) {
    const parentSort = fractal.parent.splitControlData(ConstSplitIndicators.Sort);
    return parentSort.length > 0 ? parentSort : Object.keys(fractal.parent.dto.fractals || {});
  }
  const ownSort = fractal.splitControlData(ConstSplitIndicators.Sort);
  return ownSort.length > 0 ? ownSort : Object.keys(fractal.dto.fractals || {});
};
