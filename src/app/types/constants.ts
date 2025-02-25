export interface Constant<T extends object> {
  value: T;
  values: (keyof T)[];
  record: Record<keyof T, string>;
  strings: string[];
}
