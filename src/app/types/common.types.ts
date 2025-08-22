export type Timeout = ReturnType<typeof setTimeout>;
export type ConstantsValues<T> = T[keyof T];
export type TapEvents = 'hold' | 'touch';
export type Paths = 'edit';

export interface AppError {
  name: string;
  message: string;
  get formError(): Record<string, string>;
}
