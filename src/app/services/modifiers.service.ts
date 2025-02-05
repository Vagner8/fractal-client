import { Injectable, signal } from '@angular/core';
import { Fractal, AppEntities } from '@types';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService extends BaseService {
  hold$ = new Subject<Fractal | null>();
  touch$ = new Subject<Fractal | null>();
  $modifier = signal<Fractal | null>(null);

  hold(modifier: Fractal | null): void {
    this.hold$.next(modifier);
  }

  async touch(modifier: Fractal | null): Promise<void> {
    this.touch$.next(modifier);
    this.$modifier.set(modifier);
    await this.navigate({ [AppEntities.Modifiers]: modifier ? modifier.cursor : null });
  }

  init({ root, AppModifiers }: { root: Fractal; AppModifiers: string }): void {
    this.$modifier.set(AppModifiers ? root.getFractal(AppModifiers) : null);
  }
}
