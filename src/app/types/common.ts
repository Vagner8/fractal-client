import { ConstIndicators } from '@constants';

export type Timeout = ReturnType<typeof setTimeout>;

export type IndicatorData = keyof typeof ConstIndicators | [string];

export interface IAppMap<T> extends Map<string, T> {
  get first(): T | null;
  get arrKeys(): string[];
  get arrValues(): T[];
}
