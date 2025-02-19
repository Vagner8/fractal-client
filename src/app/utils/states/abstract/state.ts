import { signal, WritableSignal } from '@angular/core';

export abstract class State<T> {
  value: T;
  signal: WritableSignal<T>;

  constructor(private initValue: T) {
    this.value = initValue;
    this.signal = signal(initValue);
  }

  abstract get isEmpty(): boolean;
  abstract has(value: unknown): boolean;

  set(value: T): void {
    this.value = value;
    this.signal.set(value);
  }

  clear(): void {
    this.set(this.initValue);
  }
}
