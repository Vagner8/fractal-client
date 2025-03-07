import { inject, Injectable, signal } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ConstAppFractals, ConstAppParams } from '@constants';
import { IFractal, IFractalDto } from '@types';
import { Fractal, Fractals } from '@utils';
import { FractalState } from 'app/utils/states';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  private router = inject(Router);
  $app = signal<IFractal | null>(null);

  sidenavTaps = new FractalState();
  currentFractal = new FractalState();

  modifiers: IFractal | null = null;
  collections: IFractal | null = null;

  init(dto: IFractalDto): void {
    try {
      const app = new Fractal(dto);
      app.fractals = Fractals(app.dto.fractals, app);
      this.modifiers = app.fractals.getRecursively(ConstAppFractals.Modifiers);
      this.collections = app.fractals.getRecursively(ConstAppFractals.Collections);
      this.$app.set(app);
      console.info('🚀 ~ app:', app);
    } catch (err) {
      console.error(err);
    }
  }

  async navigatePage(page: string): Promise<void> {
    this.navigate([page], { [ConstAppParams.Modifiers]: null });
  }

  async navigateManager(param: string | null): Promise<void> {
    this.navigate([], { [ConstAppParams.Manager]: param });
  }

  async navigateModifier(param: string | null): Promise<void> {
    this.navigate([], { [ConstAppParams.Modifiers]: param });
  }

  async navigate(commands: unknown[], queryParams?: NavigationExtras['queryParams']): Promise<void> {
    this.router.navigate(commands, {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
