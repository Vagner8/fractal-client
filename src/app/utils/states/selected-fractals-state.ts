import { Control, Fractal } from '@types';
import { ArrayState } from './abstract/array-state';
import { ConstParams, ConstSeparator } from '@constants';
import { inject } from '@angular/core';
import { EntitiesService } from '@services';
import { Router } from '@angular/router';
import { ObjectState } from './abstract/object-state';

export class SelectedControlsState extends ArrayState<Control> {
  constructor() {
    super([]);
  }
}

export class SelectFractalFromState extends ObjectState<Fractal | null> {
  constructor() {
    super(null);
  }
}

export class SelectedFractalsState extends ArrayState<Fractal> {
  ens = inject(EntitiesService);
  router = inject(Router);

  constructor() {
    super([]);
  }

  init(selected: string): void {
    selected.split(ConstSeparator).forEach(id => this.push(this.ens.$app()?.findFractal(id)));
  }

  toggleAll({ parent }: Fractal): void {
    this.set(this.isEmpty ? parent.childrenFractals : []);
    this.navigate();
  }

  async pushAndNavigate(fractal: Fractal | null): Promise<void> {
    super.push(fractal);
    this.navigate();
  }

  async deleteAndNavigate(fractal: Fractal | null): Promise<void> {
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
