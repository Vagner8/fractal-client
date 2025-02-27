import { isCollection } from '../guards';
import { Fractal, FractalCollection, RecordFractals } from '@types';
import { RecordFactory } from './record-factory';

export class RecordFractalsFactory extends RecordFactory<Fractal> implements RecordFractals {
  override get(indicator: string): Fractal {
    return this.record[indicator];
  }

  getCollection(test: string, fractals: RecordFractals = this): FractalCollection | null {
    const result = fractals.get(test);
    if (isCollection(result)) return result;
    for (const fractal of fractals.values) {
      if (isCollection(fractal)) {
        const nestedResult = this.getCollection(test, fractal.fractals);
        if (nestedResult) return nestedResult;
      }
    }
    return null;
  }
}
