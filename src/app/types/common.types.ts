import { Fractal } from './fractal.types';

export type Timeout = ReturnType<typeof setTimeout>;
export type ConstantsValues<T> = T[keyof T];

export interface AppError {
  name: string;
  message: string;
  get formError(): Record<string, string>;
}

export interface RowEmitType {
  parent: Fractal;
  childCursor: string;
}
