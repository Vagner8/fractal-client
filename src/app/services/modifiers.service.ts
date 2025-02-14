import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { ConstEditMods, ConstModifiers } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  hold$ = new Subject<string | null>();
  touch$ = new Subject<string | null>();
  $modifier = signal<string | null>(null);
  $editMode = signal<string | null>(null);

  hold(modifier: string | null): void {
    this.hold$.next(modifier);
  }

  set(modifier: string | null): void {
    const { Edit } = ConstModifiers;
    this.touch$.next(modifier);
    this.$modifier.update(prev => {
      if (modifier === Edit) this.updateEditMode(prev);
      return modifier;
    });
  }

  clear(): void {
    this.$modifier.set(null);
    this.$editMode.set(null);
  }

  private updateEditMode(prevModifier: string | null): void {
    const { Controls, Fractals } = ConstEditMods;
    this.$editMode.update(prev => {
      if (prevModifier) {
        return prev === Controls ? Fractals : Controls;
      }
      return Fractals;
    });
  }
}
