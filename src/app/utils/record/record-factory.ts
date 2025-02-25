import { BaseRecord } from '@types';

export class RecordFactory<T> implements BaseRecord<T> {
  record: Record<string, T> = {};

  get values(): T[] {
    return Object.values(this.record);
  }

  get(indicator: string): T {
    return this.record[indicator];
  }

  set(key: string, fractal: T): void {
    this.record[key] = fractal;
  }
}
