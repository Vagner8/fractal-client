import { inject, Injectable, signal } from '@angular/core';
import { Params, QueryParamsHandling, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private router = inject(Router);

  $modifiersParam = signal<string | null>(null);

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
