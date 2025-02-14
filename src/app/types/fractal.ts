import { FormRecord } from '@angular/forms';
import { ControlDto, ControlFromRecord, ControlsDto, NewControlForm } from './control';
import { ConstSort } from '@constants';

export type SortMode = (typeof ConstSort.values)[number];
export type Fractals = Record<string, Fractal>;
export type FractalsDto = Record<string, FractalDto>;
export type FractalForm = FormRecord<NewControlForm>;

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

  is(test: string | object): boolean;
  sort(mode?: SortMode): string[];

  findControl(indicator: string): ControlDto | null;
  findFractal(test: string): Fractal | null;

  addControlsDto(forms: NewControlForm[]): ControlDto[];
  getControlFrom(indicator: string): ControlFromRecord;
}
