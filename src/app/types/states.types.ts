import { WritableSignal } from '@angular/core';
import { Fractal } from './fractal.types';

export interface IBaseState<T> {
  value: T;
  $value: WritableSignal<T>;
  get isEmpty(): boolean;
  set(value: T): void;
  clear(): void;
  refresh(): void;
}

export interface IArrayState<T> extends IBaseState<T[]> {
  has(item: T | undefined | null): boolean;
  push(item: T): void;
  toggle(item: T | undefined | null): void;
  pushUnique(item: T): void;
  deleteBunch(items: T[]): void;
}

export interface IBoolState extends IBaseState<boolean> {
  toggle(): void;
}

export interface IFractalState extends IBaseState<Fractal | null> {
  toggle(fractal: Fractal): void;
}

export interface IFractalsState extends IArrayState<Fractal> {}

export interface IDataSplitState {
  strings: string[];
  set(value: string): void;
}
