import { Signal, WritableSignal } from '@angular/core';

export interface ICollectionState {
  value: unknown[];

  $value: WritableSignal<unknown[]>;
  $isEmpty: Signal<boolean>;

  push(item: unknown): void;
  clear(): void;
  delete(items: unknown[]): void;
  toggle(cursor: string): void;
  toggleAll(): void;

  $$has(item: unknown): Signal<boolean>;
  $$hasItemWithCursor(cursor: string): Signal<boolean>;
}
