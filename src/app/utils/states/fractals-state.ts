import { Fractal, FractalDto } from '@types';
import { updateFractalsByForm } from '../fractal/fractal-form';
import { ArrayState } from './array-state';

export class FractalsState extends ArrayState<Fractal> {
  toggle(fractal: Fractal): void {
    console.log('this', this);
    this.set(this.has(fractal) ? this.value.filter(prev => prev !== fractal) : [...this.value, fractal]);
  }

  toggleAll({ parent }: Fractal): void {
    this.set(this.isEmpty ? parent.childrenFractals : []);
  }

  toDto(): FractalDto[] {
    return this.value.map(({ dto }) => dto);
  }

  updateFractalsByForm(): FractalDto[] {
    return updateFractalsByForm(this.value);
  }
}
