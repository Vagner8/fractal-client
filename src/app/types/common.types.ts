export type TimeoutId = ReturnType<typeof setTimeout>;
export type IntervalId = ReturnType<typeof setInterval>;
export type ConstantsValues<T> = T[keyof T];
export type TapEvents = 'hold' | 'touch';
export type Paths = 'edit';
export type HoldDelay = 300 | 1000;

export interface AppError {
  name: string;
  message: string;
  get formError(): Record<string, string>;
}
