import { IFractal, FractalsDto, IFractals } from '@types';
import { Fractal } from './fractal';

export class Fractals extends Map<string, IFractal> implements IFractals {
  constructor(fractalsDto: FractalsDto | null, parent: IFractal) {
    super();
    let fractal: IFractal;
    for (const indicator in fractalsDto) {
      const dto = fractalsDto[indicator];
      fractal = new Fractal(dto, parent);
      fractal.fractals = new Fractals(fractalsDto[indicator].fractals, fractal);
      this.set(indicator, fractal);
    }
  }

  getRecursively(test: string, fractals: Fractals = this): IFractal | null {
    const result = fractals.get(test);
    if (result) return result;
    for (const fractal of fractals.values()) {
      const nestedResult = this.getRecursively(test, fractal.fractals);
      if (nestedResult) return nestedResult;
    }
    return null;
  }
}
