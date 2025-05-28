import { IFractal, IFractals, AppError } from '@types';
import { Fractal } from '../factories/fractal.factory';
import { CIndicatorDuplicationError } from '@constants';

export class FractalsMap extends Map<string, IFractal> implements IFractals {
  constructor(public parent: IFractal) {
    super();
    let fractal: IFractal;
    const parentFractalsDto = parent.dto.fractals;
    for (const indicator in parentFractalsDto) {
      const dto = parentFractalsDto[indicator];
      fractal = new Fractal({ dto, parent });
      fractal.fractals = new FractalsMap(fractal);
      this.set(indicator, fractal);
    }
  }

  setOne(cursor: string, fractal: IFractal): [IFractal, AppError | null] {
    if (this.has(cursor)) {
      return [fractal, CIndicatorDuplicationError];
    } else {
      if (this.parent.dto.fractals) {
        this.parent.dto.fractals[cursor] = fractal.dto;
      } else {
        this.parent.dto.fractals = { [cursor]: fractal.dto };
      }
      this.set(cursor, fractal);
      return [fractal, null];
    }
  }

  getByCursor(cursor: string | undefined, fractals: IFractals = this): IFractal | null {
    if (!cursor) return null;
    const result = fractals.get(cursor);
    if (result) return result;
    for (const fractal of fractals.values()) {
      const nestedResult = this.getByCursor(cursor, fractal.fractals);
      if (nestedResult) return nestedResult;
    }
    return null;
  }
}
