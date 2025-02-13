import { effect, inject, Injectable, signal } from '@angular/core';
import { Fractal } from '@types';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';
import { ConstEditMods, ConstModifiers, ConstParams } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  bs = inject(BaseService);
  hold$ = new Subject<Fractal | null>();
  touch$ = new Subject<Fractal | null>();
  $modifier = signal<Fractal | null>(null);
  $editMode = signal<string | null>(null);

  constructor() {
    effect(() =>
      this.bs.navigate({
        [ConstParams.EditMode]: this.$editMode(),
        [ConstParams.Modifiers]: this.$modifier()?.cursor,
      })
    );
  }

  hold(modifier: Fractal | null): void {
    this.hold$.next(modifier);
  }

  set(modifier: Fractal | null): void {
    const { Controls, Fractals } = ConstEditMods;
    this.touch$.next(modifier);
    this.$modifier.update(prev => {
      this.$editMode.set(prev?.is(ConstModifiers.Edit) ? Controls : Fractals);
      return modifier;
    });
  }

  clear(): void {
    this.$modifier.set(null);
    this.$editMode.set(null);
  }

  init({ app, ConstModifiers }: { app: Fractal; ConstModifiers: string }): void {
    this.$modifier.set(ConstModifiers ? app.getFractal(ConstModifiers) : null);
  }
}
