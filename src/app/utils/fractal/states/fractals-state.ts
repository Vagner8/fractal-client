import { IFractal } from '@types';
import { ArrayState } from './abstract-states/array-state';

export class FractalsState extends ArrayState<IFractal> {
  refresh(): void {
    this.$value.update(prev => [...prev]);
  }

  toggleAll(fractal: IFractal | undefined | null): void {
    if (!fractal) return;
    this.$value.update(prev => (prev.length === 0 ? Array.from(fractal.parent.fractals.values()) : []));
  }

  delete(fractal: IFractal | null): void {
    this.$value.update(prev => prev.filter(prevFractal => prevFractal !== fractal));
  }
}
