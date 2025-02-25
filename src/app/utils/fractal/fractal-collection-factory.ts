import { Fractal, FractalCollection, RecordFractals } from '@types';
import { isCollection } from '../guards';
import { FractalFactory } from './fractal-factory';
import { BehaviorSubject } from 'rxjs';

export class FractalCollectionFactory extends FractalFactory implements FractalCollection {
  fractals!: RecordFractals;

  heldChildren$ = new BehaviorSubject<Fractal | null>(null);
  touchedChildren$ = new BehaviorSubject<Fractal | null>(null);

  unselectAllChildren(): void {
    this.fractals.values.forEach(fractal => fractal.$selected.set(false));
  }

  getSelectedCollection(): FractalCollection | null {
    const result = this.fractals.values.find(fractal => fractal.$selected());
    return result && isCollection(result) ? result : null;
  }
}
