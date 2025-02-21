import { Fractal } from '@types';
import { ObjectState } from './abstract/object-state';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export class CurrentFractalState extends ObjectState<Fractal | null> {
  private router = inject(Router);

  constructor() {
    super(null);
  }

  async setAndNavigate(fractal: Fractal | null): Promise<void> {
    super.set(fractal);
    this.router.navigate(fractal ? [fractal.cursor] : [], {
      queryParamsHandling: 'merge',
    });
  }
}
