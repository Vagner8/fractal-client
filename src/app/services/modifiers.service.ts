import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';
import { ConstAppEntities } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService extends BaseService {
  hold$ = new Subject<Fractal | null>();
  touch$ = new Subject<Fractal | null>();
  $modifier = signal<Fractal | null>(null);
  $prevModifier = signal<Fractal | null>(null);

  hold(modifier: Fractal | null): void {
    this.hold$.next(modifier);
  }

  async set(modifier: Fractal | null): Promise<void> {
    this.touch$.next(modifier);
    this.$modifier.update(prev => {
      this.$prevModifier.set(prev);
      return modifier;
    });
    await this.navigate({ [ConstAppEntities.Modifiers]: modifier ? modifier.cursor : null });
  }

  init({ root, ConstAppModifiers }: { root: Fractal; ConstAppModifiers: string }): void {
    this.$modifier.set(ConstAppModifiers ? root.getFractal(ConstAppModifiers) : null);
  }
}
