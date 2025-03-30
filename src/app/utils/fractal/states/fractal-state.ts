import { IFractal } from '@types';
import { BaseState } from './abstract-states/base-state';

export class FractalState extends BaseState<IFractal | null> {
  toggle(fractal: IFractal): void {
    this.set(this.value === fractal ? null : fractal);
  }
}
