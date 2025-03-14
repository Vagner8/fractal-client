import { IFractal, IFractalsState } from '@types';
import { BaseState } from './abstract-states/base-state';

export class FractalsState extends BaseState<IFractal[]> implements IFractalsState {
  get isEmpty(): boolean {
    return this.$value().length === 0;
  }

  has(fractal: IFractal | undefined | null): boolean {
    if (!fractal) return false;
    return this.$value().includes(fractal);
  }

  push(fractal: IFractal): void {
    this.$value.update(prev => [...prev, fractal]);
  }

  clear(): void {
    this.$value.set([]);
  }

  toggle(fractal: IFractal | undefined | null): void {
    if (!fractal) return;
    this.$value.update(prev => (prev.includes(fractal) ? prev.filter(item => item !== fractal) : [...prev, fractal]));
  }

  refresh(): void {
    this.$value.update(prev => [...prev]);
  }

  toggleAll(fractal: IFractal | undefined | null): void {
    if (!fractal) return;
    this.$value.update(prev => (prev.length === 0 ? Array.from(fractal.parent.fractals.values()) : []));
  }
}
