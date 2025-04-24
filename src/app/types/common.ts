import { ConstIndicatorsType } from './constants';

export type Timeout = ReturnType<typeof setTimeout>;
export type IndicatorData = ConstIndicatorsType | [string];

export interface AppError {
  name: string;
  message: string;
  get formError(): Record<string, string>;
}
