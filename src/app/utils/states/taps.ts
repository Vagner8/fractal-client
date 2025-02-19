import { Fractal } from '@types';
import { ObjectState } from './abstract/object-state';
import { inject } from '@angular/core';
import { ConstEntities, ConstParams } from '@constants';
import { EntitiesService } from '@services';
import { Router } from '@angular/router';

export class TapsState extends ObjectState<Fractal | null> {
  ens = inject(EntitiesService);
  router = inject(Router);

  constructor() {
    super(null);
  }

  toggle(): void {
    this.setAndNavigate(this.value?.is(ConstEntities.Pages) ? this.ens.modifiers : this.ens.pages);
  }

  async setAndNavigate(fractal: Fractal | null): Promise<void> {
    super.set(fractal);
    this.router.navigate([], {
      queryParams: {
        [ConstParams.Taps]: fractal?.cursor,
      },
      queryParamsHandling: 'merge',
    });
  }
}
