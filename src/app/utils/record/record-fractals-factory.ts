import { isCollection } from '../guards';
import { Fractal, FractalCollection, RecordFractals } from '@types';

export class RecordFractalsFactory implements RecordFractals {
  record: Record<string, Fractal> = {};

  get values(): Fractal[] {
    return Object.values(this.record);
  }

  set(key: string, fractal: Fractal): void {
    this.record[key] = fractal;
  }

  get(indicator: string): Fractal | null {
    return this.values.find(fractal => fractal.is(indicator)) || null;
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
