import { FractalDto, Fractal, Fractals, ControlDto, FractalForm, ControlFromRecord } from '@types';
import { FractalDtoFactory } from './fractal-dto-factory';
import { checkValue } from '@utils';
import { FormRecord } from '@angular/forms';
import { ConstIndicators, ConstAppCollections, ConstAppEntities, ConstControlFormKeys } from '@constants';
import { findFractalRecursively, getFractalSort } from './helpers';
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

  get isItem(): boolean {
    return !this.isRoot && this.parent.is(ConstAppCollections);
  }

  get isRoot(): boolean {
    return this.is(ConstAppEntities.Root);
  }

  get isCollection(): boolean {
    return this.is(ConstAppCollections);
  }

  get sort(): string[] {
    return getFractalSort(this);
  }

  get cursor(): string {
    return checkValue(
      this.findControl(ConstIndicators.Cursor)?.data || this.findControl(ConstIndicators.Position)?.data,
      'Unable to get cursor'
    );
  }

  get controls(): ControlDto[] {
    return Object.values(this.dto.controls);
  }

  get childrenFractals(): Fractal[] {
    return Object.values(this.fractals || {});
  }

  is(test: string | object): boolean {
    if (test instanceof FractalFactory) return this === test;
    if (typeof test === 'object') return Object.values(test).includes(this.cursor);
    return test === this.cursor;
  }

  getControl(indicator: string): ControlDto {
    return checkValue(this.dto.controls[indicator], `Unable to get control be indicator: ${indicator}`);
  }

  findControl(indicator: string): ControlDto | null {
    const control = this.dto.controls[indicator];
    return control ? control : null;
  }

  splitControlData(indicator: string): string[] {
    const control = this.findControl(indicator);
    return control?.data ? control.data.split(':') : [];
  }

  getFractal(test: string): Fractal {
    return checkValue(findFractalRecursively(test, this.fractals), `Unable to get fractal by: ${test}`);
  }

  findFractal(test: string): Fractal | null {
    return findFractalRecursively(test, this.fractals);
  }

  getControlFrom(indicator: string): ControlFromRecord {
    return ConstControlFormKeys.values.reduce((acc, key) => {
      acc[key] = this.form.controls[indicator].controls[key];
      return acc;
    }, {} as ControlFromRecord);
  }
}
