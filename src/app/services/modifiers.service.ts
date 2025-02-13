import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';
import { Subject } from 'rxjs';
import { ConstEditMods, ConstModifiers } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  hold$ = new Subject<Fractal | null>();
  touch$ = new Subject<Fractal | null>();
  $modifier = signal<Fractal | null>(null);
  $editMode = signal<string | null>(null);

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
}
