import { WritableSignal } from '@angular/core';
import { IControl } from './control';

export interface IBaseState<T> {
  $value: WritableSignal<T>;
  set(value: T): void;
  clear(): void;
}

export interface IArrayState<T> extends IBaseState<T[]> {
  get isEmpty(): boolean;
  has(item: T | undefined | null): boolean;
  push(item: T): void;
  toggle(item: T | undefined | null): void;
  filter(fn: (item: T) => boolean): void;
  forEach(fn: (item: T) => void): void;
  refresh(): void;
  deleteBunch(items: T[]): void;
}

export interface IBoolState extends IBaseState<boolean> {
  toggle(): void;
}

export interface IControlsState extends IArrayState<IControl> {}
