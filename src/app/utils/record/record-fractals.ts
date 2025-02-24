import { RecordAbstract } from './record-abstract';
import { AbstractFractal, CollectionFractal } from '../fractal';

export class RecordFractals extends RecordAbstract<AbstractFractal> {
  set(key: string, fractal: AbstractFractal): void {
    this.record[key] = fractal;
  }

  override get(test: string): AbstractFractal | null {
    return this.values.find(fractal => fractal.is(test)) || null;
  }

  getCollection(test: string, fractals: RecordFractals = this): CollectionFractal | null {
    const result = fractals.get(test);
    if (result instanceof CollectionFractal) return result;
    for (const fractal of fractals.values) {
      if (fractal instanceof CollectionFractal) {
        const nestedResult = this.getCollection(test, fractal.fractals);
        if (nestedResult) return nestedResult;
      }
    }
    return null;
  }
}
