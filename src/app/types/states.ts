import { WritableSignal } from '@angular/core';
import { Fractal } from './fractal';

export interface FractalState {
  $value: WritableSignal<Fractal | null>;

  set(fractal: Fractal | null): void;
  toggle(fractal: Fractal): void;
  refresh(): void;
}

export interface FractalsState {
  $value: WritableSignal<Fractal[]>;

  push(fractal: Fractal): void;
  clear(): void;
  toggle(fractal: Fractal): void;
  refresh(): void;
  toggleAll(fractal: Fractal): void;
}
