export abstract class RecordAbstract<T> {
  record: Record<string, T> = {};

  get values(): T[] {
    return Object.values(this.record);
  }

  abstract get(test: object | string): unknown;
}
