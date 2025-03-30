import { IFractal } from '@types';
import { ArrayState } from './abstract-states/array-state';

export class FractalsState extends ArrayState<IFractal> {
  toggleAll(fractal: IFractal | undefined | null): void {
    if (fractal) this.set(this.isEmpty ? [] : Array.from(fractal.parent.fractals.values()));
  }
}
