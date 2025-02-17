import { Fractal } from '@types';
import { ObjectState } from './abstract-states/object-state';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstParams } from '@constants';

export class CurrentFractalState extends ObjectState<Fractal | null> {
  route = inject(ActivatedRoute);

  constructor() {
    super(null);
  }

  async setAndNavigate(fractal: Fractal | null): Promise<void> {
    super.set(fractal);
    const { queryParams } = this.route.snapshot;
    this.router.navigate(fractal ? [fractal.cursor] : [], {
      queryParams: {
        [ConstParams.Taps]: queryParams[ConstParams.Taps],
        [ConstParams.Manager]: queryParams[ConstParams.Manager],
      },
    });
  }
}
