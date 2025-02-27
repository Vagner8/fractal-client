import { ConstIndicators } from '@constants';
import { Control } from './control';
import { Fractal, FractalCollection } from './fractal';

export interface BaseRecord<T> {
  record: Record<string, T>;
  get keys(): string[];
  get values(): T[];
  set(key: string, fractal: T): void;
  get(indicator: unknown): T | null;
}

export interface RecordFractals extends BaseRecord<Fractal> {
  getCollection(test: string, fractals?: RecordFractals): FractalCollection | null;
}

export interface RecordControls extends BaseRecord<Control> {
  get(indicator: keyof typeof ConstIndicators | { unsaveIndicator: string }): Control | null;
}
