import { RecordFractals } from '../record/record-fractals';
import { AbstractFractal } from './abstract-fractal';

export class CollectionFractal extends AbstractFractal {
  override parent!: CollectionFractal;
  fractals!: RecordFractals;

  unselectAllChildren(): void {
    this.fractals.values.forEach(fractal => fractal.$selected.set(false));
  }

  findFractalRecursively(test: string, fractals: RecordFractals = this.fractals): AbstractFractal | null {
    let result = fractals.get(test);
    if (result) return result;
    for (const fractal of fractals.values) {
      result = fractal instanceof CollectionFractal ? this.findFractalRecursively(test, fractal.fractals) : null;
    }
    return null;
  }
}
