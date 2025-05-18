import { IFractal } from '@types';
import { BaseState } from './base.state';

export class FractalState extends BaseState<IFractal | null> {
  toggle(fractal: IFractal): void {
    this.set(this.value === fractal ? null : fractal);
  }
}
