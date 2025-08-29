export type TimeoutId = ReturnType<typeof setTimeout>;
export type IntervalId = ReturnType<typeof setInterval>;
export type ConstantsValues<T> = T[keyof T];
export type Paths = 'edit';
export type HoldEvents = 'save' | 'warning' | 'danger';
export type HoldEventState = 'start' | 'cancel' | HoldEvents;

export interface AppError {
  name: string;
  message: string;
  get formError(): Record<string, string>;
}
