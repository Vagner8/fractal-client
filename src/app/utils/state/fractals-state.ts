import { Fractal, FractalDto } from '@types';
import { State } from './state';
import { updateFractalsByForm } from '../fractal/fractal-form';

export class FractalsState extends State<Fractal[]> {
  constructor() {
    super([]);
  }

  override has(fractal: Fractal): boolean {
    return this.value.some(prev => prev === fractal);
  }

  override toggle(fractal: Fractal): void {
    this.set(this.has(fractal) ? this.value.filter(prev => prev !== fractal) : [...this.value, fractal]);
  }

  override get isEmpty(): boolean {
    return this.value.length === 0;
  }

  push(fractal: Fractal): void {
    this.set([...this.value, fractal]);
  }

  delete(fractal: Fractal): void {
    this.set(this.value.filter(prev => prev !== fractal));
  }

  toggleAll({ parent }: Fractal): void {
    this.set(this.isEmpty ? parent.children : []);
  }

  toDto(): FractalDto[] {
    return this.value.map(({ dto }) => dto);
  }

  updateFractalsByForm(): FractalDto[] {
    return updateFractalsByForm(this.value);
  }
}
