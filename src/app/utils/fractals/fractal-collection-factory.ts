import { Fractal, FractalCollection, RecordFractals } from '@types';
import { isCollection } from '../guards';
import { FractalFactory } from './fractal-factory';
import { BehaviorSubject } from 'rxjs';

export class FractalCollectionFactory extends FractalFactory implements FractalCollection {
  fractals!: RecordFractals;

  heldChildren$ = new BehaviorSubject<Fractal | null>(null);
  touchedChildren$ = new BehaviorSubject<Fractal | null>(null);

  override get default(): FractalCollection['default'] {
    return {
      sortChildren: this.fractals.keys,
      sortOwnControls: this.controls.keys,
      sortChildrenControls: this.fractals.values.length > 0 ? this.fractals.values[0].controls.keys : [],
    };
  }

  unselectAllChildren(): void {
    this.fractals.values.forEach(fractal => fractal.$selected.set(false));
  }

  getSelectedCollection(): FractalCollection | null {
    const result = this.fractals.values.find(fractal => fractal.$selected());
    return result && isCollection(result) ? result : null;
  }
}
