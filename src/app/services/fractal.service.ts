import { inject, Injectable, signal } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CAppFractals, CAppParams } from '@constants';
import { IFractal, IFractalDto } from '@types';
import { Fractal } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  private readonly router = inject(Router);
  $app = signal<IFractal | null>(null);

  modifiers: IFractal | null = null;
  collections: IFractal | null = null;

  init(dto: IFractalDto): void {
    const app = new Fractal({ dto });
    this.modifiers = app.fractals.getByCursor(CAppFractals.Modifiers);
    this.collections = app.fractals.getByCursor(CAppFractals.Collections);
    this.$app.set(app);
  }

  async navigatePage(page: string): Promise<void> {
    this.navigate([page], { [CAppParams.Modifiers]: null });
  }

  async navigateManager(param: string | null): Promise<void> {
    this.navigate([], { [CAppParams.Manager]: param });
  }

  async navigateModifier(param: string | null): Promise<void> {
    this.navigate([], { [CAppParams.Modifiers]: param });
  }

  async navigate(commands: unknown[], queryParams?: NavigationExtras['queryParams']): Promise<void> {
    this.router.navigate(commands, {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
