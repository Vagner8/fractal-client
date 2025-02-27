import {
  ControlDto,
  Fractal,
  FractalDefaultSort,
  FractalDto,
  FractalInitOptions,
  ControlsRecord,
  FractalsRecord,
} from '@types';
import { signal } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { ControlsRecordFactory } from '../controls/controls-record-factory';
import { ControlFactory } from '../controls/control-factory';
import { isFractal } from '../guards';
import { FractalsRecordFactory } from './fractals-record-factory';
import { NewFractalFactory } from './new-fractal-factory';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  form = new FormRecord({});
  parent: Fractal;
  controls: ControlsRecord;
  fractals!: FractalsRecord;

  $selected = signal(false);
  $newChildren = signal<Fractal[]>([]);
  $selectedChildren = signal<Fractal[]>([]);

  constructor(dto: FractalDto, parent?: Fractal | null, options?: FractalInitOptions) {
    this.dto = dto;
    this.parent = parent ? parent : ({} as Fractal);
    this.controls = this.createControls(this, options);
    this.fractals = new FractalsRecordFactory();
  }

  get default(): FractalDefaultSort {
    return {
      sortChildren: this.fractals.keys,
      sortOwnControls: this.controls.keys,
      sortChildrenControls: this.fractals.values.length > 0 ? this.fractals.values[0].controls.keys : [],
    };
  }

  is(value: string | object): boolean {
    const cursor = this.controls.getCursorData;
    if (isFractal(value)) return this === value;
    if (typeof value === 'object') return Object.values(value).includes(cursor);
    return value === cursor;
  }

  update(): ControlDto[] {
    return this.controls.values.reduce((acc: ControlDto[], control) => {
      if (control.form.dirty) acc.push(control.update());
      return acc;
    }, []);
  }

  addNewChild(): void {
    this.$newChildren.update(prev => [...prev, NewFractalFactory(this, { syncFormWithDto: true })]);
  }

  addChildren(): FractalDto[] {
    return this.$newChildren().reduce((acc: FractalDto[], child) => {
      if (child.form.dirty) {
        const position = child.controls.get('Position')?.get('data');
        position && this.fractals.set(position, child);
        acc.push(child.dto);
      }
      return acc;
    }, []);
  }

  updateChildrenControls(): ControlDto[] {
    return this.$selectedChildren().reduce((acc: ControlDto[], fractal) => {
      if (fractal.form.dirty) acc = [...acc, ...fractal.update()];
      return acc;
    }, []);
  }

  private createControls(fractal: Fractal, options?: FractalInitOptions): ControlsRecord {
    const { dto, form } = fractal;
    const record = new ControlsRecordFactory();
    Object.entries(dto.controls).forEach(([key, controlDto]) => {
      const control = new ControlFactory(controlDto, options);
      form.addControl(key, control.form);
      record.record[key] = control;
    });
    return record;
  }
}
