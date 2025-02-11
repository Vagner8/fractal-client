import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Params, QueryParamsHandling, Router } from '@angular/router';
import { AppEntities } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  route = inject(ActivatedRoute);
  router = inject(Router);

  get isModifierParams(): boolean {
    return Boolean(this.route.snapshot.queryParams[AppEntities.Modifiers]);
  }

  async navigate(
    queryParams?: Params,
    commands: string[] = [],
    queryParamsHandling: QueryParamsHandling = 'merge'
  ): Promise<void> {
    await this.router.navigate(commands, {
      queryParams,
      queryParamsHandling,
    });
  }
}
