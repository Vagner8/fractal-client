import { inject } from '@angular/core';
import { ObjectState } from './abstract/object-state';
import { Router } from '@angular/router';
import { ConstEditMods, ConstParams } from '@constants';

export class EditModeState extends ObjectState<string> {
  router = inject(Router);

  constructor() {
    super(ConstEditMods.Fractals);
  }

  toggleAndNavigate(): void {
    const { Controls, Fractals } = ConstEditMods;
    this.setAndNavigate(this.value === Controls ? Fractals : Controls);
  }

  async setAndNavigate(mode: string): Promise<void> {
    this.set(mode);
    this.router.navigate([], {
      queryParams: {
        [ConstParams.EditMode]: mode,
      },
      queryParamsHandling: 'merge',
    });
  }
}
