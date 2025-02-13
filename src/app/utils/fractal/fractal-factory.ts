import { FractalDto, Fractal, Fractals, ControlDto, FractalForm, ControlFromRecord, SortMode } from '@types';
import { checkValue } from '@utils';
import { FormRecord } from '@angular/forms';
import { ConstIndicators, ConstCollections, ConstEntities, ConstControlFormKeys } from '@constants';
import { findFractalRecursively, getFractalSort } from './helpers';
import { createFractalForm } from './fractal-form';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  form: FractalForm;
  parent: Fractal;
  fractals: Fractals | null = null;
  childrenForms = new FormRecord({});

  constructor({ dto, parent }: { dto: FractalDto; parent?: Fractal | null }) {
    this.parent = parent ? parent : ({} as Fractal);
    this.dto = dto;
    this.form = createFractalForm(this);
  }

  get isItem(): boolean {
    return !this.isApp && this.parent.is(ConstCollections);
  }

  get isApp(): boolean {
    return this.is(ConstEntities.App);
  }

  get isCollection(): boolean {
    return this.is(ConstCollections);
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

  sort(mode: SortMode = 'table'): string[] {
    return getFractalSort(this, mode);
  }

  findControl(indicator: string): ControlDto | null {
    const control = this.dto.controls[indicator];
    return control ? control : null;
  }

  splitControlData(indicator: string): string[] {
    const control = this.findControl(indicator);
    return control?.data ? control.data.split(':') : [];
  }

  findFractal(test: string): Fractal | null {
    if (this.cursor === test || this.dto.id === test) return this;
    return findFractalRecursively(test, this.fractals);
  }

  getControlFrom(indicator: string): ControlFromRecord {
    return ConstControlFormKeys.values.reduce((acc, key) => {
      acc[key] = this.form.controls[indicator].controls[key];
      return acc;
    }, {} as ControlFromRecord);
  }
}
