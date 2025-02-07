import {
  FractalDto,
  Fractal,
  Fractals,
  ControlDto,
  Indicators,
  SplitIndicators,
  FractalForm,
  AppEntities,
  AppCollections,
} from '@types';
import { FractalDtoFactory } from './fractal-dto-factory';
import { checkValue, createForm } from '@utils';
import { findFractalRecursively } from 'app/utils/getters';
import { FormControl, FormGroup, FormRecord } from '@angular/forms';
import { v4 } from 'uuid';
import { ControlInputs, ControlKeys } from '@constants';

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

  has(test: string): boolean {
    return Boolean(this.getControlData(test));
  }

  addControl(form: FormGroup): ControlDto {
    const value = form.value;
    const control: ControlDto = {
      id: v4(),
      data: value[ControlKeys.data],
      input: value[ControlKeys.input],
      parentId: this.dto.id,
      indicator: value[ControlKeys.indicator],
    };
    this.dto.controls[ControlKeys.indicator] = control;
    this.form.addControl(value[ControlKeys.indicator], new FormControl(value[ControlKeys.data]));

    // this.form = new FormRecord({});
    return control;
  }

  getControl(indicator: string): ControlDto {
    const control = this.dto.controls[indicator];
    if (control) return control;
    else throw new Error(`Unable to get control by: ${indicator}`);
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

  updateFractalByForm(): FractalDto {
    const { controls } = this.dto;
    for (const indicator in controls) {
      const form = this.form.controls[indicator];
      const control = controls[indicator];
      if (control.input === ControlInputs.Select) {
        control.data = [form.value, ...control.data.split(':').filter(item => item !== form.value)].join(':');
      } else {
        control.data = form.value;
      }
    }
    return this.dto;
  }
}
