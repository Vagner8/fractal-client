import { IControl, IDataSplitState } from '@types';

export class DataSplitState implements IDataSplitState {
  strings: string[] = [];
  private readonly uniques: Set<string> = new Set([]);

  constructor(private readonly control: IControl) {
    const { data } = control.dto;
    if (data) {
      let start = 0;
      for (let i = 0; i <= data.length; i++) {
        if (data[i] === ':' || i === data.length) {
          const value = data.slice(start, i);
          this.uniques.add(value);
          this.strings.push(value);
          start = i + 1;
        }
      }
    }
  }

  set(value: string): void {
    if (!this.uniques.has(value)) {
      this.strings.push(value);
      this.control.set(this.control.dto.data ? `${this.control.dto.data}:${value}` : value);
    }
    this.uniques.add(value);
  }
}
