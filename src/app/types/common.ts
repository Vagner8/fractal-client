export type Timeout = ReturnType<typeof setTimeout>;

export interface BaseRecord<T> {
  record: Record<string, T>;
  get keys(): string[];
  get values(): T[];
  set(key: string, fractal: T): void;
  get(indicator: unknown): T | null;
}
