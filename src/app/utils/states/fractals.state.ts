import { IFractal, IFractalsState } from '@types';
import { ArrayState } from './array.state';

export class FractalsState extends ArrayState<IFractal> implements IFractalsState {
  toggleAll(fractal: IFractal | undefined | null): void {
    if (fractal) this.set(this.isEmpty ? [] : Array.from(fractal.parent.fractals.values()));
  }
}
