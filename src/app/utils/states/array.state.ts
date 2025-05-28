import { IArrayState } from '@types';
import { BaseState } from './base.state';

export abstract class ArrayState<T> extends BaseState<T[]> implements IArrayState<T> {
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

  pushUnique(item: T): void {
    !this.has(item) && this.push(item);
  }

  deleteBunch(items: T[]): void {
    this.set(this.value.filter(fractal => !items.includes(fractal)));
  }
}
