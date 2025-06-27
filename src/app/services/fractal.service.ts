import { inject, Injectable, signal } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { APP_FRACTALS, APP_PARAMS } from '@constants';
import { ConstantsValues, Fractal, FractalDto } from '@types';
import { FractalBase } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  private readonly router = inject(Router);
  $app = signal<Fractal | null>(null);

  manager!: Fractal;
  modifiers!: Fractal;
  collections!: Fractal;

  init(dto: FractalDto): void {
    const app = new FractalBase(dto);
    console.log('🚀 ~ app:', app);

    [this.manager, this.modifiers, this.collections] = (
      ['Manager', 'Modifiers', 'Collections'] satisfies ConstantsValues<typeof APP_FRACTALS>[]
    ).map(app.getChildRecursively);
    this.$app.set(app);
  }

  async navigatePage(page: string): Promise<void> {
    this.navigate([page], { [APP_PARAMS.MODIFIERS]: null });
  }

  async navigateManager(param: string | null): Promise<void> {
    this.navigate([], { [APP_PARAMS.MANAGER]: param });
  }

  async navigateModifier(param: string | null): Promise<void> {
    this.navigate([], { [APP_PARAMS.MODIFIERS]: param });
  }

  async navigate(commands: unknown[], queryParams?: NavigationExtras['queryParams']): Promise<void> {
    this.router.navigate(commands, {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
