import { Fractal } from '@types';
import { AppSignal } from './app-signal';
import { checkValue } from '../common';

export class FractalSignal extends AppSignal<Fractal | null> {
  constructor() {
    super(null);
  }

  get get(): Fractal {
    return checkValue(this.value);
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
