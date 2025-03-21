import { WritableSignal } from '@angular/core';

export interface IBaseState<T> {
  $value: WritableSignal<T>;
  set(value: T): void;
  clear(): void;
}

export interface IBoolState extends IBaseState<boolean> {
  toggle(): void;
}
