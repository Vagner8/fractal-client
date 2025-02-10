import { Injectable, signal } from '@angular/core';
import { Fractal, FractalDto } from '@types';
import { AppEntities, createFractalsRecursively, FractalFactory } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  $root = signal<Fractal | null>(null);
  pages: Fractal | null = null;
  manager: Fractal | null = null;
  modifiers: Fractal | null = null;

  init(dto: FractalDto): void {
    const root = new FractalFactory({ dto });
    root.fractals = createFractalsRecursively(root.dto.fractals, root);
    this.pages = root.findFractal(AppEntities.Pages);
    this.manager = root.findFractal(AppEntities.Manager);
    this.modifiers = root.findFractal(AppEntities.Modifiers);
    this.$root.set(root);

    console.log('🚀 ~ root', this.$root());
  }
}
