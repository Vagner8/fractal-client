import { signal, WritableSignal } from '@angular/core';
import { IBaseState } from '@types';

export abstract class BaseState<T> implements IBaseState<T> {
  value!: T;
  $value: WritableSignal<T>;

  constructor(private readonly initValue: T) {
    this.$value = signal(initValue);
    this.value = initValue;
  }

  get isEmpty(): boolean {
    return this.value === null;
  }

  set(value: T): void {
    this.value = value;
    this.$value.set(value);
  }

  clear(): void {
    this.set(this.initValue);
  }

  refresh(): void {
    const prev = this.value;
    this.set(this.initValue);
    this.set(prev);
  }
}
