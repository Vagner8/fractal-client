import { ObjectState } from './abstract/object-state';
import { ConstParams } from '@constants';
import { inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export class ModifiersState extends ObjectState<string | null> {
  router = inject(Router);
  hold$ = new BehaviorSubject<string | null>(null);

  constructor() {
    super(null);
  }

  async setAndNavigate(modifier: string | null): Promise<void> {
    this.set(modifier);
    this.navigate(modifier);
  }

  override async clear(): Promise<void> {
    super.clear();
    this.navigate(null);
  }

  private async navigate(modifier: string | null): Promise<void> {
    this.router.navigate([], {
      queryParams: {
        [ConstParams.Modifiers]: modifier,
      },
      queryParamsHandling: 'merge',
    });
  }
}
