import { INDICATORS } from '@constants';

export type Timeout = ReturnType<typeof setTimeout>;
export type ConstantsValues<T> = T[keyof T];
export type SearchControlData = ConstantsValues<typeof INDICATORS> | [string];

export interface AppError {
  name: string;
  message: string;
  get formError(): Record<string, string>;
}
export interface TdContentProps {
  column: string;
  indicator: string;
}
