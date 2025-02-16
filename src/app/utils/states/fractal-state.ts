import { Fractal } from '@types';
import { State } from './state';

export class FractalState extends State<Fractal | null> {
  toggle(fractal: Fractal | null): void {
    this.set(this.value === fractal ? null : fractal);
  }
}
