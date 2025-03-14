import { signal, WritableSignal } from '@angular/core';

export abstract class BaseState<T> {
  $value: WritableSignal<T>;

  constructor(private initValue: T) {
    this.$value = signal(initValue);
  }
}
