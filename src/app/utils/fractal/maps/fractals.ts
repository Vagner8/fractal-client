import { IFractal, FractalsDto, IFractals, AppError } from '@types';
import { Fractal } from '../factories/fractal';
import { CIndicatorDuplicationError } from '@constants';

export class Fractals extends Map<string, IFractal> implements IFractals {
  constructor(
    fractalsDto: FractalsDto | null,
    public parent: IFractal
  ) {
    super();
    let fractal: IFractal;
    for (const indicator in fractalsDto) {
      const dto = fractalsDto[indicator];
      fractal = new Fractal(dto, parent);
      fractal.fractals = new Fractals(fractalsDto[indicator].fractals, fractal);
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
