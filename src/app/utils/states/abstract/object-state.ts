import { State } from './state';

export abstract class ObjectState<T> extends State<T> {
  override get isEmpty(): boolean {
    return this.value === null;
  }

  override has(value: T): boolean {
    return this.value === value;
  }
}
