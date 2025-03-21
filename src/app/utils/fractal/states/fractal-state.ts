import { IFractal } from '@types';
import { BaseState } from './abstract-states/base-state';

export class FractalState extends BaseState<IFractal | null> {
  get isEmpty(): boolean {
    return this.$value() === null;
  }

  toggle(fractal: IFractal): void {
    this.$value.update(prev => (prev === fractal ? null : fractal));
  }

  refresh(): void {
    const prev = this.$value();
    this.set(null);
    this.set(prev);
  }
}
