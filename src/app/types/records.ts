import { Control, Indicators } from './control';
import { Fractal, FractalCollection } from './fractal';

export interface BaseRecord<T> {
  record: Record<string, T>;
  get values(): T[];
  set(key: string, fractal: T): void;
  get(indicator: string): T | null;
}

export interface RecordFractals extends BaseRecord<Fractal> {
  getCollection(test: string, fractals?: RecordFractals): FractalCollection | null;
}

export interface RecordControls extends BaseRecord<Control> {
  getData(value: Indicators | { string: string }): string;
}
