import { Signal, WritableSignal } from '@angular/core';

export interface ICollectionState {
  value: unknown[];
  $value: WritableSignal<unknown[]>;
  $isEmpty: Signal<boolean>;
  $cursors: Signal<string[]>;

  has(item: unknown): boolean;
  push(item: unknown): void;
  delete(items: unknown[]): void;
  toggle(cursor: string): void;
  toggleAll(): void;
}
