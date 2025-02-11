import { FractalDto, Fractal, Fractals, ControlDto, FractalForm, ControlEditableKeys } from '@types';
import { FractalDtoFactory } from './fractal-dto-factory';
import { checkValue } from '@utils';
import { FormControl, FormRecord } from '@angular/forms';
import { ConstIndicators, ConstSplitIndicators, ConstAppCollections, ConstAppEntities } from '@constants';
import { findFractalRecursively } from './helpers';
import { createFractalForm } from './fractal-form';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  form: FractalForm;
  parent: Fractal;
  fractals: Fractals | null = null;
  childrenForms = new FormRecord({});

  constructor({ dto, parent }: { dto?: FractalDto; parent?: Fractal | null }) {
    this.parent = parent ? parent : ({} as Fractal);
    this.dto = dto ? dto : new FractalDtoFactory(this.parent);
    this.form = createFractalForm(this);
  }

  get sort(): string[] {
    return this.has(ConstSplitIndicators.Sort)
      ? this.splitControlData(ConstSplitIndicators.Sort)
      : this.childrenIndicators;
  }

  get cursor(): string {
    return this.getControlData(ConstIndicators.Cursor) || this.getControlData(ConstIndicators.Position);
  }

  get children(): Fractal[] {
    return Object.values(this.fractals || {});
  }

  get isItem(): boolean {
    return !this.isRoot && this.parent.is(ConstAppCollections);
  }

  get isRoot(): boolean {
    return this.is(ConstAppEntities.Root);
  }

  get isCollection(): boolean {
    return this.is(ConstAppCollections);
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

  getControlForm(indicator: string, key: keyof ControlEditableKeys): FormControl {
    return this.form.controls[indicator].controls[key] as FormControl;
  }
}
