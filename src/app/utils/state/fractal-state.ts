import { Fractal } from '@types';
import { State } from './state';

export class FractalState extends State<Fractal | null> {
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
