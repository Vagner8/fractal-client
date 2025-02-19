import { inject } from '@angular/core';
import { ObjectState } from './abstract/object-state';
import { ConstParams } from '@constants';
import { Router } from '@angular/router';

export class ManagerState extends ObjectState<string | null> {
  router = inject(Router);

  constructor() {
    super(null);
  }

  async setAndNavigate(event: string | null): Promise<void> {
    super.set(event);
    this.router.navigate([], {
      queryParams: {
        [ConstParams.Manager]: event,
      },
      queryParamsHandling: 'merge',
    });
  }
}
