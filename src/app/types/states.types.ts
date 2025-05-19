import { WritableSignal } from '@angular/core';
import { IControl, IControlDto } from './control.types';
import { IFractal } from './fractal.types';

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

export interface IControlsState extends IArrayState<IControl> {}
export interface IControlsDtoState extends IArrayState<IControlDto> {}

export interface IFractalsState extends IArrayState<IFractal> {
  toggleAll(fractal: IFractal | undefined | null): void;
}

export interface ISelectedChildrenState extends IFractalsState {
  dirtyFractals: IFractalsState;
  dirtyControls: IControlsState;
  retainNewChildren(): void;
}

export interface IDataSplitState {
  strings: string[];
  set(value: string): void;
}
