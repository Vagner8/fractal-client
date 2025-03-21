import { signal, WritableSignal } from '@angular/core';
import { IBaseState } from '@types';

export abstract class BaseState<T> implements IBaseState<T> {
  $value: WritableSignal<T>;

  constructor(private readonly initValue: T) {
    this.$value = signal(initValue);
  }

  set(value: T): void {
    this.$value.set(value);
  }

  clear(): void {
    this.set(this.initValue);
  }
}
