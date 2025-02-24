import { Control, ControlsDto, Indicators } from './control';
import { WritableSignal } from '@angular/core';
import { FormRecord } from '@angular/forms';

export type FractalsDto = Record<string, FractalDto>;

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface RecordFractals {
  record: Record<string, Fractal>;
  get values(): Fractal[];
  set(key: string, fractal: Fractal): void;
  get(indicator: string): Fractal | null;
  getCollection(test: string, fractals?: RecordFractals): FractalCollection | null;
}

export interface RecordControls {
  record: Record<string, Control>;
  get values(): Control[];
  get(indicator: string): Control;
  getData(value: Indicators | { string: string }): string;
}

export interface Fractal {
  dto: FractalDto;
  form: FormRecord;
  parent: FractalCollection;
  controls: RecordControls;
  $selected: WritableSignal<boolean>;
  is(value: string | object): boolean;
}

export interface FractalCollection extends Fractal {
  parent: FractalCollection;
  fractals: RecordFractals;
  unselectAllChildren(): void;
  getSelectedCollection(): FractalCollection | null;
}
