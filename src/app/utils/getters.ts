import { Fractal, Fractals } from '@types';

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
