import { FormControl, FormRecord } from '@angular/forms';
import { ControlDto, ControlFromRecord, ControlsDto } from './control';

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

  get sort(): string[];
  get cursor(): string;

  get children(): Fractal[];
  get controls(): ControlDto[];

  get childrenIndicators(): string[];
  get controlsIndicators(): string[];

  get isItem(): boolean;
  get isRoot(): boolean;
  get isCollection(): boolean;

  is(test: string | object): boolean;
  has(test: string): boolean;

  getControl(indicator: string): ControlDto;
  findControl(indicator: string): ControlDto | null;
  getControlData(indicator: string): string;
  splitControlData(indicator: string): string[];

  getFractal(test: string): Fractal;
  findFractal(test: string): Fractal | null;

  getControlFrom(indicator: string): ControlFromRecord;
}
