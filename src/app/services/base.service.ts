import { inject, Injectable } from '@angular/core';
import { Params, QueryParamsHandling, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  router = inject(Router);

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
