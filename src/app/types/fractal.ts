import { FormRecord } from '@angular/forms';
import { ControlDto, ControlFormRecord, ControlsDto, ControlForm } from './control';
import { ConstSort } from '@constants';

export type SortMode = (typeof ConstSort.values)[number];
export type Fractals = Record<string, Fractal>;
export type FractalsDto = Record<string, FractalDto>;
export type FractalForm = FormRecord<ControlForm>;

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface SplitControlDataReturnType {
  sort: string[];
  control: ControlDto | null;
}

export interface Fractal {
  dto: FractalDto;
  form: FractalForm;
  parent: Fractal;
  fractals: Fractals | null;
  childrenForms: FormRecord;

  get isApp(): boolean;
  get isItem(): boolean;
  get isCollection(): boolean;

  get cursor(): string;

  get controls(): ControlDto[];
  get childrenFractals(): Fractal[];

  get sortChildren(): string[];
  get sortControls(): string[];
  get sortChildrenControls(): string[];

  is(test: string | object): boolean;

  findControl(indicator: string): ControlDto | null;
  findFractal(test: string): Fractal | null;

  getControlFrom(indicator: string): ControlFormRecord;
}
