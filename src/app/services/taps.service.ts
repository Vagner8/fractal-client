import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';
import { BaseService } from './base.service';
import { ConstAppEntities, ConstAppGroups } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class TapsService extends BaseService {
  $taps = signal<Fractal | null>(null);

  init({ Taps, modifiers, pages }: { Taps: string; modifiers: Fractal; pages: Fractal }): void {
    this.$taps.set(Taps === ConstAppEntities.Pages ? pages : modifiers);
  }

  async set(taps: Fractal): Promise<void> {
    this.$taps.set(taps);
    await this.navigate({ [ConstAppGroups.Taps]: taps.cursor });
  }
}
