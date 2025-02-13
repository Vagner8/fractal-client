import { effect, inject, Injectable, signal } from '@angular/core';
import { Fractal } from '@types';
import { BaseService } from './base.service';
import { ConstEntities, ConstGroups } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class TapsService {
  bs = inject(BaseService);
  $taps = signal<Fractal | null>(null);

  constructor() {
    effect(() => this.bs.navigate({ [ConstGroups.Taps]: this.$taps()?.cursor }));
  }

  init({ Taps, modifiers, pages }: { Taps: string; modifiers: Fractal; pages: Fractal }): void {
    this.$taps.set(Taps === ConstEntities.Pages ? pages : modifiers);
  }

  async set(taps: Fractal): Promise<void> {
    this.$taps.set(taps);
  }
}
