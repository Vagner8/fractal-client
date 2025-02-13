import { effect, inject, Injectable, signal } from '@angular/core';
import { Fractal } from '@types';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';
import { ConstAppEntities } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  bs = inject(BaseService);
  hold$ = new Subject<Fractal | null>();
  touch$ = new Subject<Fractal | null>();
  $records = signal<Fractal[]>([]);
  $modifier = signal<Fractal | null>(null);

  constructor() {
    effect(() => {
      const current = this.$modifier();
      this.bs.navigate({ [ConstAppEntities.Modifiers]: current && current.cursor });
    });
  }

  hold(modifier: Fractal | null): void {
    this.hold$.next(modifier);
  }

  set(modifier: Fractal | null): void {
    this.touch$.next(modifier);
    this.$records.update(prev => {
      if (!modifier) return prev;
      return prev.length < 3 ? [...prev, modifier] : [...prev.slice(1), modifier];
    });
    this.$modifier.set(modifier);
  }

  clear(): void {
    this.$records.set([]);
    this.$modifier.set(null);
  }

  init({ app, ConstAppModifiers }: { app: Fractal; ConstAppModifiers: string }): void {
    this.$modifier.set(ConstAppModifiers ? app.getFractal(ConstAppModifiers) : null);
  }
}
