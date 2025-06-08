import { IFractal, IFractalState } from '@types';
import { BaseState } from './base.state';

export class FractalState extends BaseState<IFractal | null> implements IFractalState {
  toggle(fractal: IFractal): void {
    this.set(this.value === fractal ? null : fractal);
  }
}
