import { Fractal } from '@types';
import { State } from './state';
import { checkValue } from '../common';

export class FractalState extends State<Fractal | null> {
  constructor() {
    super(null);
  }

  get get(): Fractal {
    return checkValue(this.value, `Unable to get state in: ${this.value?.cursor}`);
  }

  has(fractal: Fractal | null): boolean {
    return this.value === fractal;
  }

  override get isEmpty(): boolean {
    return this.value !== null;
  }

  override toggle(fractal: Fractal | null): void {
    this.set(this.value === fractal ? null : fractal);
  }
}
