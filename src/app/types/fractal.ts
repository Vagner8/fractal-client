import { FormControl, FormRecord } from '@angular/forms';
import { ControlDto, ControlFromRecord, ControlsDto } from './control';

export type SortMode = 'form' | 'table';
export type Fractals = Record<string, Fractal>;
export type FractalsDto = Record<string, FractalDto>;
export type FractalForm = FormRecord<FormRecord<FormControl>>;

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface Fractal {
  dto: FractalDto;
  form: FractalForm;
  parent: Fractal;
  fractals: Fractals | null;
  childrenForms: FormRecord;

  get isRoot(): boolean;
  get isItem(): boolean;
  get isCollection(): boolean;

  get cursor(): string;

  get controls(): ControlDto[];
  get childrenFractals(): Fractal[];

  is(test: string | object): boolean;
  sort(mode?: SortMode): string[];

  getControl(indicator: string): ControlDto;
  findControl(indicator: string): ControlDto | null;
  splitControlData(indicator: string): string[];

  getFractal(test: string): Fractal;
  findFractal(test: string): Fractal | null;

  getControlFrom(indicator: string): ControlFromRecord;
}
