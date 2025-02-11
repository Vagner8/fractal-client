import { signal, WritableSignal } from '@angular/core';
import { Fractal } from '@types';

export abstract class State<T> {
  value: T;
  signal: WritableSignal<T>;

  constructor(private initValue: T) {
    this.value = initValue;
    this.signal = signal(initValue);
  }

  set(value: T): void {
    this.value = value;
    this.signal.set(value);
  }

  clear(): void {
    this.set(this.initValue);
  }

  abstract has(fractal: Fractal | null): boolean;
  abstract toggle(fractal: Fractal | null): void;
  abstract get isEmpty(): boolean;
}
