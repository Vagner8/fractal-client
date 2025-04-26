import { ConstIndicatorsType } from './constants.types';

export type Timeout = ReturnType<typeof setTimeout>;
export type SearchControlData = ConstIndicatorsType | [string];

export interface AppError {
  name: string;
  message: string;
  get formError(): Record<string, string>;
}
