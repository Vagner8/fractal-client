import { computed, effect, signal } from '@angular/core';
import { Control, Fractal, ICollectionState } from '@types';
import { FractalState } from './fractal.state';

export abstract class CollectionState<T extends Fractal | Control> implements ICollectionState {
  value: T[] = [];
  $value = signal<T[]>([]);

  $isEmpty = computed<boolean>(() => this.$value().length === 0);
  $cursors = computed<string[]>(() => this.$value().map(({ cursor }) => cursor));

  constructor(protected selectedFractalState: FractalState) {
    effect(() => {
      this.value = this.$value();
    });
  }

  has = (item: T | null): boolean => this.value.some((i) => i === item);
  push = (item: T): void => this.$value.update((prev) => [...prev, item]);
  delete = (items: T[]): void => this.$value.update((prev) => prev.filter((item) => !items.includes(item)));

  protected toggleItem(item: T | null | undefined): void {
    if (item) {
      if (this.has(item)) {
        this.delete([item]);
      } else {
        this.push(item);
      }
    }
  }

  abstract toggle(cursor: string): void;
  abstract toggleAll(): void;
}
