import { State } from './state';

export abstract class ArrayState<T> extends State<T[]> {
  push(value: T | null | undefined): void {
    value && this.set([...this.value, value]);
  }

  delete(value: T | null): void {
    value && this.set(this.value.filter(prev => prev !== value));
  }

  override get isEmpty(): boolean {
    return this.value.length === 0;
  }

  override has(value: T): boolean {
    return this.value.includes(value);
  }
}
