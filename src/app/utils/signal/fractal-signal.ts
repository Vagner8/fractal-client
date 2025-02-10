import { Fractal } from '@types';
import { AppSignal } from './app-signal';

export class FractalSignal extends AppSignal<Fractal | null> {
  constructor() {
    super(null);
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
