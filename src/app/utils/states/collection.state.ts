import { computed, effect, Signal, signal } from '@angular/core';
import { Control, Fractal, ICollectionState } from '@types';
import { StatesService } from '@services';

export abstract class CollectionState<T extends Fractal | Control> implements ICollectionState {
  value: T[] = [];
  $value = signal<T[]>([]);

  $isEmpty = computed<boolean>(() => this.$value().length === 0);
  $cursors = computed<string[]>(() => this.$value().map(({ cursor }) => cursor));

  constructor(protected ss: StatesService) {
    effect(() => {
      this.value = this.$value();
    });
  }

  push = (item: T): void => this.$value.update((prev) => [...prev, item]);
  clear = (): void => this.$value.set([]);
  delete = (items: T[]): void => this.$value.update((prev) => prev.filter((item) => !items.includes(item)));

  $$has = (item: T | null | undefined): Signal<boolean> =>
    computed(() => (item ? this.$value().includes(item) : false));
  $$hasItemWithCursor = (cursor: string): Signal<boolean> =>
    computed(() => this.$value().some((item) => item.cursor === cursor));

  protected toggleItem(item: T | null | undefined): void {
    if (item) {
      if (this.value.includes(item)) {
        this.delete([item]);
      } else {
        this.push(item);
      }
    }
  }

  protected toggleAllItems(items: Record<string, T> | null | undefined): void {
    if (items) {
      this.$value.update((prev) => (prev.length > 0 ? [] : Object.values(items)));
    }
  }

  abstract toggle(cursor: string): void;
  abstract toggleAll(): void;
}
