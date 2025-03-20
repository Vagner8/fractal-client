import { WritableSignal } from '@angular/core';

export interface IBaseState<T> {
  $value: WritableSignal<T>;
  clear(): void;
}

export interface IBoolState extends IBaseState<boolean> {
  toggle(): void;
}
