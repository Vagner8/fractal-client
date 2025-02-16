import { State } from './state';

export class ArrayState<T> extends State<T[]> {
  push(value: T): void {
    this.set([...this.value, value]);
  }

  delete(value: T): void {
    this.set(this.value.filter(prev => prev !== value));
  }
}
