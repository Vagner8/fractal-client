import { Injectable, signal } from '@angular/core';
import { ConstAppEntities } from '@constants';
import { Fractal, FractalDto } from '@types';
import { createFractalsRecursively, FractalFactory } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  $app = signal<Fractal | null>(null);
  pages: Fractal | null = null;
  manager: Fractal | null = null;
  modifiers: Fractal | null = null;

  init(dto: FractalDto): void {
    const app = new FractalFactory({ dto });
    app.fractals = createFractalsRecursively(app.dto.fractals, app);
    this.pages = app.findFractal(ConstAppEntities.Pages);
    this.manager = app.findFractal(ConstAppEntities.Manager);
    this.modifiers = app.findFractal(ConstAppEntities.Modifiers);
    this.$app.set(app);

    console.log('🚀 ~ app', this.$app());
  }
}
