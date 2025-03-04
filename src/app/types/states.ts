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

  has(fractal: Fractal | null): boolean;
  push(fractal: Fractal): void;
  clear(): void;
  toggle(fractal: Fractal | null): void;
  refresh(): void;
  toggleAll(fractal: Fractal | null): void;
}
