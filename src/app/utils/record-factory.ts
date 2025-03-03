import { BaseRecord } from '@types';

export abstract class RecordFactory<T> implements BaseRecord<T> {
  record: Record<string, T> = {};

  abstract get(indicator: unknown): T | null;

  get keys(): string[] {
    return Object.keys(this.record);
  }

  get values(): T[] {
    return Object.values(this.record);
  }

  set(key: string, fractal: T): void {
    this.record[key] = fractal;
  }

  delete(key: string): void {
    delete this.record[key];
  }
}
