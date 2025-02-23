import { FractalDto, Fractal, Fractals, ControlDto, FractalForm, Controls } from '@types';
import { checkValue } from '@utils';
import { FormRecord } from '@angular/forms';
import { ConstIndicators, ConstSeparator, ConstSort } from '@constants';
import { createControls, findFractalRecursively } from './helpers';
import { ControlDtoFactory } from '../control/control-dto-factory';
import { ControlFactory } from '../control/control-factory';
import { NewControlsState } from '../states/new-controls-state';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  form: FractalForm;
  parent: Fractal;
  fractals: Fractals | null = null;
  controls: Controls;
  childrenForms = new FormRecord({});

  newControls = new NewControlsState();

  constructor({ dto, parent }: { dto: FractalDto; parent?: Fractal | null }) {
    this.parent = parent ? parent : ({} as Fractal);
    this.dto = dto;
    this.form = new FormRecord({});
    this.controls = createControls(this);
  }

  get cursor(): string {
    return checkValue(
      this.findControl(ConstIndicators.Cursor)?.data || this.findControl(ConstIndicators.Position)?.data,
      'Unable to get cursor'
    );
  }

  get childrenFractals(): Fractal[] {
    return Object.values(this.fractals || {});
  }

  get sortChildren(): string[] {
    const sort = this.findControl(ConstSort.SortChildren);
    return sort ? sort.data.split(ConstSeparator) : Object.keys(this.dto.fractals || {});
  }

  get sortControls(): string[] {
    return Object.keys(this.dto.controls);
  }

  get sortChildrenControls(): string[] {
    const sort = this.findControl(ConstSort.SortChildrenControls);
    return sort ? sort.data.split(ConstSeparator) : [];
  }

  is(test: string | object): boolean {
    if (test instanceof FractalFactory) return this === test;
    if (typeof test === 'object') return Object.values(test).includes(this.cursor);
    return test === this.cursor;
  }

  findControl(indicator: string): ControlDto | null {
    const control = this.dto.controls[indicator];
    return control ? control : null;
  }

  findFractal(test: string): Fractal | null {
    if (this.cursor === test || this.dto.id === test) return this;
    return findFractalRecursively(test, this.fractals);
  }

  pushNewControl(): void {
    this.newControls.push(new ControlFactory(new ControlDtoFactory(this.dto.id)));
  }
}
