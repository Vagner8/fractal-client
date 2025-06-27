import { computed, Injectable, signal } from '@angular/core';
import { ParamMap } from '@angular/router';
import { APP_FRACTALS } from '@constants';
import { Fractal } from '@types';
import { FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  selectedFractal = new FractalState();
  selectedChildren = new FractalsState();

  $paramMap = signal<ParamMap | null>(null);
  $onEditPage = computed<boolean>(() => !!this.$paramMap()?.get(APP_FRACTALS.MODIFIERS));
  $sidenavTaps = signal<Fractal | null>(null);
  $managerEvent = signal<string | null>(null);
  $isHoldEventRunning = signal(false);
}
