import { computed, signal } from '@angular/core';
import { Control, Fractal } from '@types';

export abstract class CollectionState<T extends Fractal | Control> {
  value: T[] = [];
  $value = signal<T[]>([]);
  $cursors = signal<string[]>([]);

  $isEmpty = computed<boolean>(() => this.$value().length === 0);

  has = (item: T | null): boolean => this.value.some((f) => f === item);
  push = (item: T): void => this.set([...this.value, item]);
  delete = (item: T | null): void => this.set(this.value.filter((prevItem) => prevItem !== item));
  isEmpty = (): boolean => this.value.length === 0;
  deleteBunch = (items: T[]): void => this.set(this.value.filter((item) => !items.includes(item)));

  toggle(item: T | null): void {
    if (item) {
      if (this.has(item)) {
        this.delete(item);
      } else {
        this.push(item);
      }
    }
  }

  set = (items: T[]): void => {
    this.value = items;
    this.$value.set(items);
    this.$cursors.set(items.map(({ cursor }) => cursor));
  };

  abstract toggleAll(fractal: Fractal): void;
}
