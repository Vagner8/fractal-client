import { signal, WritableSignal } from '@angular/core';
import { IBaseState } from '@types';

export abstract class BaseState<T> implements IBaseState<T> {
  $value: WritableSignal<T>;

  constructor(private readonly initValue: T) {
    this.$value = signal(initValue);
  }

  clear(): void {
    this.$value.set(this.initValue);
  }
}
