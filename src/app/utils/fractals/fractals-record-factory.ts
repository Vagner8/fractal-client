import { Fractal, FractalsRecord } from '@types';
import { RecordFactory } from '../record-factory';

export class FractalsRecordFactory extends RecordFactory<Fractal> implements FractalsRecord {
  override get(indicator: string): Fractal | null {
    return this.record[indicator];
  }

  getRecursively(test: string, fractals: FractalsRecord = this): Fractal | null {
    const result = fractals.get(test);
    if (result) return result;
    for (const fractal of fractals.values) {
      const nestedResult = this.getRecursively(test, fractal.fractals);
      if (nestedResult) return nestedResult;
    }
    return null;
  }
}
