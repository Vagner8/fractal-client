import { effect, inject, Injectable } from '@angular/core';
import { Fractal } from '@types';
import { FractalState, FractalsState } from '@utils';
import { BaseService } from './base.service';

interface SelectServiceSignals {
  $new: FractalsState;
  $current: FractalState;
  $selected: FractalsState;
}

@Injectable({
  providedIn: 'root',
})
export class SelectService implements SelectServiceSignals {
  bs = inject(BaseService);
  $new = new FractalsState();
  $current = new FractalState();
  $selected = new FractalsState();

  constructor() {
    effect(() => {
      const current = this.$current.signal();
      this.bs.navigate({}, current ? [current.cursor] : []);
    });
  }

  clear(...keys: (keyof SelectServiceSignals)[]): void {
    keys.forEach(key => this[key].clear());
  }

  init({ app, Pages }: { app: Fractal; Pages: string }): void {
    this.$current.set(app.getFractal(Pages));
  }
}
