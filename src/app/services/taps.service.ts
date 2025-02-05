import { Injectable, signal } from '@angular/core';
import { Fractal, AppEntities, AppGroups } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TapsService extends BaseService {
  $taps = signal<Fractal | null>(null);

  init({ Taps, modifiers, pages }: { Taps: string; modifiers: Fractal; pages: Fractal }): void {
    this.$taps.set(Taps === AppEntities.Pages ? pages : modifiers);
  }

  async set(taps: Fractal): Promise<void> {
    this.$taps.set(taps);
    await this.navigate({ [AppGroups.Taps]: taps.cursor });
  }
}
