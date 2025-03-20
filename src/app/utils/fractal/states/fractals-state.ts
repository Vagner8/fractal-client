import { IFractal } from '@types';
import { ArrayState } from './abstract-states/array-state';

export class FractalsState extends ArrayState<IFractal> {
  toggleAll(fractal: IFractal | undefined | null): void {
    if (!fractal) return;
    this.$value.update(prev => (prev.length === 0 ? Array.from(fractal.parent.fractals.values()) : []));
  }
}
