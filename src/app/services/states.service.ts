import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';
import { FractalsState, FractalState } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  selectedFractal = new FractalState();
  selectedChildren = new FractalsState();

  $sidenavTaps = signal<Fractal | null>(null);
  $managerEvent = signal<string | null>(null);
  $isHoldEventRunning = signal(false);
}
