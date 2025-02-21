import { signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class State<T> {
  value: T;
  $value: WritableSignal<T>;
  value$ = new Subject<T>();

  constructor(private initValue: T) {
    this.value = initValue;
    this.$value = signal(initValue);
  }

  abstract get isEmpty(): boolean;
  abstract has(value: unknown): boolean;

  set(value: T): void {
    this.value = value;
    this.$value.set(value);
    this.value$.next(value);
  }

  clear(): void {
    this.set(this.initValue);
  }
}
