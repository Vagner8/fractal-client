import { State } from './state';

export abstract class ArrayState<T> extends State<T[]> {
  push(value: T | null | undefined): void {
    value && this.set([...this.value, value]);
  }

  delete(value: T | null): void {
    value && this.set(this.value.filter(prev => prev !== value));
  }

  toggle(value: T): void {
    this.set(this.has(value) ? this.value.filter(prev => prev !== value) : [...this.value, value]);
  }

  override get isEmpty(): boolean {
    return this.value.length === 0;
  }

  override has(value: T | null): boolean {
    return this.value.some(item => item === value);
  }
}
