import { IFractal, IFractalMap } from '@types';
import { AppMap } from './app-map';

export class FractalMap extends AppMap<IFractal> implements IFractalMap {
  getRecursively(test: string, fractals: IFractalMap = this): IFractal | null {
    const result = fractals.get(test);
    if (result) return result;
    for (const fractal of fractals.values()) {
      const nestedResult = this.getRecursively(test, fractal.fractals);
      if (nestedResult) return nestedResult;
    }
    return null;
  }
}
