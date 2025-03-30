import { BaseState } from './base-state';

export abstract class ArrayState<T> extends BaseState<T[]> {
  override get isEmpty(): boolean {
    return this.value.length === 0;
  }

  override refresh(): void {
    this.set([...this.value]);
  }

  has(item: T | undefined | null): boolean {
    if (!item) return false;
    return this.value.includes(item);
  }

  push(item: T): void {
    this.set([...this.value, item]);
  }

  toggle(item: T | undefined | null): void {
    if (!item) return;
    this.set(this.value.includes(item) ? this.value.filter(prevItem => prevItem !== item) : [...this.value, item]);
  }

  filter(fn: (item: T) => boolean): void {
    this.set(this.value.filter(fn));
  }

  forEach(fn: (item: T) => void): void {
    this.value.forEach(fn);
  }

  deleteBunch(items: T[]): void {
    const set = new Set(items);
    this.set(this.value.filter(fractal => !set.has(fractal)));
  }
}
