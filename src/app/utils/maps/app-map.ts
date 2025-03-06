import { IAppMap } from '@types';

export class AppMap<T> extends Map<string, T> implements IAppMap<T> {
  get first(): T | null {
    return this.values().next().value || null;
  }

  get arrKeys(): string[] {
    return Array.from(this.keys());
  }

  get arrValues(): T[] {
    return Array.from(this.values());
  }
}
