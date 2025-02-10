import { FractalDto, Fractal, Fractals, ControlDto, FractalForm } from '@types';
import { FractalDtoFactory } from './fractal-dto-factory';
import { AppCollections, AppEntities, checkValue } from '@utils';
import { FormControl, FormRecord } from '@angular/forms';
import { Indicators, SplitIndicators } from '@constants';
import { createForm, findFractalRecursively } from './helpers';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  form: FractalForm;
  parent: Fractal;
  fractals: Fractals | null = null;
  childrenForms = new FormRecord({});

  constructor({ dto, parent }: { dto?: FractalDto; parent?: Fractal | null }) {
    this.parent = parent ? parent : ({} as Fractal);
    this.dto = dto ? dto : new FractalDtoFactory(this.parent);
    this.form = createForm(this);
  }

  get sort(): string[] {
    return this.has(SplitIndicators.Sort) ? this.splitControlData(SplitIndicators.Sort) : this.childrenIndicators;
  }

  get cursor(): string {
    return this.getControlData(Indicators.Cursor) || this.getControlData(Indicators.Position);
  }

  get children(): Fractal[] {
    return Object.values(this.fractals || {});
  }

  get isItem(): boolean {
    return !this.isRoot && this.parent.is(AppCollections);
  }

  get isRoot(): boolean {
    return this.is(AppEntities.Root);
  }

  get isCollection(): boolean {
    return this.is(AppCollections);
  }

  get controls(): ControlDto[] {
    return Object.values(this.dto.controls);
  }

  get childrenIndicators(): string[] {
    return Object.keys(this.fractals || {});
  }

  get controlsIndicators(): string[] {
    return Object.keys(this.dto.controls);
  }

  is(test: string | object): boolean {
    if (test instanceof FractalFactory) return this === test;
    if (typeof test === 'object') return Object.values(test).includes(this.cursor);
    return test === this.cursor;
  }

  has(indicator: string): boolean {
    return Boolean(this.getControlData(indicator));
  }

  getControl(indicator: string): ControlDto {
    const control = this.dto.controls[indicator];
    return checkValue<ControlDto>(control, indicator);
  }

  findControl(indicator: string): ControlDto | null {
    const control = this.dto.controls[indicator];
    return control ? control : null;
  }

  getControlData(indicator: string): string {
    return this.dto.controls[indicator]?.data || '';
  }

  splitControlData(indicator: string): string[] {
    const data = this.getControlData(indicator);
    return data ? data.split(':') : [];
  }

  getFractal(test: string): Fractal {
    const fractal = findFractalRecursively(test, this.fractals);
    return checkValue<Fractal>(fractal, test);
  }

  findFractal(test: string): Fractal | null {
    return findFractalRecursively(test, this.fractals);
  }

  getControlForm(indicator: string): FormControl {
    const from = this.form.get(indicator) as FormControl;
    return checkValue<FormControl>(from, indicator);
  }
}
