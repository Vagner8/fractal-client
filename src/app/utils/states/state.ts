import { signal, WritableSignal } from '@angular/core';

export abstract class State<T> {
  value: T;
  signal: WritableSignal<T>;

  constructor(private initValue: T) {
    this.value = initValue;
    this.signal = signal(initValue);
  }

  get isEmpty(): boolean {
    return Array.isArray(this.value) ? this.value.length === 0 : this.value !== null;
  }

  set(value: T): void {
    this.value = value;
    this.signal.set(value);
  }

  has(value: unknown): boolean {
    return Array.isArray(this.value) ? this.value.includes(value) : this.value === value;
  }

  clear(): void {
    this.signal.set(this.initValue);
  }
}
