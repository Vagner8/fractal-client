import { Fractal, FractalDto } from '@types';
import { ArrayState } from './abstract/array-state';
import { ConstParams, ConstSeparator } from '@constants';
import { inject } from '@angular/core';
import { EntitiesService } from '@services';
import { Router } from '@angular/router';

export class SelectedFractalsState extends ArrayState<Fractal> {
  ens = inject(EntitiesService);
  router = inject(Router);

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

  override toggle(fractal: Fractal): void {
    super.toggle(fractal);
    this.navigate();
  }

  private navigate(): void {
    const ids = this.value.map(fractal => fractal.dto.id);
    this.router.navigate([], {
      queryParams: {
        [ConstParams.Selected]: ids.length === 0 ? null : ids.join(ConstSeparator),
      },
      queryParamsHandling: 'merge',
    });
  }
}
