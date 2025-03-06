export type Timeout = ReturnType<typeof setTimeout>;

export interface IAppMap<T> extends Map<string, T> {
  get first(): T | null;
  get arrKeys(): string[];
  get arrValues(): T[];
}
