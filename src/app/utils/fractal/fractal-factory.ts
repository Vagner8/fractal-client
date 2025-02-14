import {
  FractalDto,
  Fractal,
  Fractals,
  ControlDto,
  FractalForm,
  ControlFromRecord,
  SortMode,
  NewControlForm,
} from '@types';
import { addControlsDto, checkValue } from '@utils';
import { FormRecord } from '@angular/forms';
import {
  ConstIndicators,
  ConstCollections,
  ConstEntities,
  ConstControlFormKeys,
  ConstSeparator,
  ConstSort,
} from '@constants';
import { findFractalRecursively } from './helpers';
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

  sort(mode: SortMode = 'SortChildren'): string[] {
    const control = this.findControl(mode);
    if (control) {
      return control.data.split(ConstSeparator);
    } else {
      return {
        [ConstSort.SortChildren]: (): string[] => {
          return this.dto.fractals ? Object.keys(this.dto.fractals) : [];
        },
        [ConstSort.SortOwnControls]: (): string[] => {
          return Object.keys(this.dto.controls);
        },
        [ConstSort.SortChildrenControls]: (): string[] => {
          return this.dto.fractals ? Object.keys(Object.values(this.dto.fractals)[0].controls) : [];
        },
      }[mode]();
    }
  }

  findControl(indicator: string): ControlDto | null {
    const control = this.dto.controls[indicator];
    return control ? control : null;
  }

  findFractal(test: string): Fractal | null {
    if (this.cursor === test || this.dto.id === test) return this;
    return findFractalRecursively(test, this.fractals);
  }

  addControlsDto(forms: NewControlForm[]): ControlDto[] {
    return addControlsDto(forms, this);
  }

  getControlFrom(indicator: string): ControlFromRecord {
    return ConstControlFormKeys.values.reduce((acc, key) => {
      acc[key] = this.form.controls[indicator].controls[key];
      return acc;
    }, {} as ControlFromRecord);
  }
}
