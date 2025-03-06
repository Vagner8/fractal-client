import { WritableSignal } from '@angular/core';
import { IFractal } from './fractal';

export interface IFractalState {
  $value: WritableSignal<IFractal | null>;

  set(fractal: IFractal | undefined | null): void;
  toggle(fractal: IFractal): void;
  refresh(): void;
}

export interface IFractalsState {
  $value: WritableSignal<IFractal[]>;

  has(fractal: IFractal | undefined | null): boolean;
  push(fractal: IFractal): void;
  clear(): void;
  toggle(fractal: IFractal | undefined | null): void;
  refresh(): void;
  toggleAll(fractal: IFractal | undefined | null): void;
}
