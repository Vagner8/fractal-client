import { BaseState } from './base-state';

export abstract class ArrayState<T> extends BaseState<T[]> {
  get isEmpty(): boolean {
    return this.$value().length === 0;
  }

  has(item: T | undefined | null): boolean {
    if (!item) return false;
    return this.$value().includes(item);
  }

  push(item: T): void {
    this.$value.update(prev => [...prev, item]);
  }

  toggle(item: T | undefined | null): void {
    if (!item) return;
    this.$value.update(prev => (prev.includes(item) ? prev.filter(prevItem => prevItem !== item) : [...prev, item]));
  }

  pushBunch(items: T[]): void {
    this.$value.update(prev => [...prev, ...items]);
  }

  deleteBunch(items: T[]): void {
    const set = new Set(items);
    this.$value.update(prev => prev.filter(fractal => !set.has(fractal)));
  }
}
