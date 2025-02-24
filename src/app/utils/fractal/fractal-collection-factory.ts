import { FractalCollection, RecordFractals } from '@types';
import { isCollection } from '../guards';
import { FractalFactory } from './fractal-factory';

export class FractalCollectionFactory extends FractalFactory implements FractalCollection {
  override parent!: FractalCollection;
  fractals!: RecordFractals;

  unselectAllChildren(): void {
    this.fractals.values.forEach(fractal => fractal.$selected.set(false));
  }

  getSelectedCollection(): FractalCollection | null {
    const result = this.fractals.values.find(fractal => fractal.$selected());
    return result && isCollection(result) ? result : null;
  }
}
