import { Fractal, FractalDto } from '@types';
import { ArrayState } from './abstract-states/array-state';
import { ConstParams, ConstSeparator } from '@constants';
import { inject } from '@angular/core';
import { EntitiesService } from '@services';

export class SelectedFractalsState extends ArrayState<Fractal> {
  ens = inject(EntitiesService);

  constructor() {
    super([]);
  }

  init(selected: string): void {
    const ids = selected.split(ConstSeparator);
    ids.forEach(id => {
      const fractal = this.ens.$app()?.findFractal(id);
      this.push(fractal);
    });
  }

  toggle(fractal: Fractal): void {
    this.set(this.has(fractal) ? this.value.filter(prev => prev !== fractal) : [...this.value, fractal]);
    this.navigate();
  }

  toggleAll({ parent }: Fractal): void {
    this.set(this.isEmpty ? parent.childrenFractals : []);
    this.navigate();
  }

  toDto(): FractalDto[] {
    return this.value.map(({ dto }) => dto);
  }

  pushAndNavigate(fractal: Fractal | null): void {
    super.push(fractal);
    this.navigate();
  }

  deleteAndNavigate(fractal: Fractal | null): void {
    super.delete(fractal);
    this.navigate();
  }

  private navigate(): void {
    this.router.navigate([], {
      queryParams: {
        [ConstParams.Selected]: this.value.map(fractal => fractal.dto.id).join(ConstSeparator),
      },
      queryParamsHandling: 'merge',
    });
  }
}
