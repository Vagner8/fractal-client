import { ControlDto, Fractal, FractalDto, FractalInitOptions, ControlsRecord, FractalsRecord } from '@types';
import { signal } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { isFractal } from '../guards';
import { FractalsStateFactory, FractalStateFactory } from '../states';
import { ConstOrder } from '@constants';
import { ControlsFactory } from '../controls/controls-factory';
import { fractalsDefaultOrder } from './fractals-default-order';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  form = new FormRecord({});
  cursor: string;
  parent: Fractal;
  controls: ControlsRecord;
  fractals!: FractalsRecord;

  $selected = signal(false);
  selectedChild = new FractalStateFactory();

  newChildren = new FractalsStateFactory();
  selectedChildren = new FractalsStateFactory();

  constructor(dto: FractalDto, parent?: Fractal | null, options?: FractalInitOptions) {
    this.dto = dto;
    this.parent = parent ? parent : ({} as Fractal);
    this.controls = ControlsFactory(this, options);
    this.cursor = this.controls.getControlData('Cursor');
  }

  is(value: string | object): boolean {
    if (isFractal(value)) return this === value;
    if (typeof value === 'object') return Object.values(value).includes(this.cursor);
    return value === this.cursor;
  }

  order(sort: keyof typeof ConstOrder): string[] {
    const result = this.controls.getControlDataAndSplit(sort);
    return result && result.length > 0 ? result : fractalsDefaultOrder(this, sort);
  }

  update(): ControlDto[] {
    return this.controls.values.reduce((acc: ControlDto[], control) => {
      if (control.form.dirty) acc.push(control.update());
      return acc;
    }, []);
  }

  addChildren(): FractalDto[] {
    return this.newChildren.$value().reduce((acc: FractalDto[], child) => {
      if (child.form.dirty) {
        this.fractals.set(child.cursor, child);
        acc.push(child.dto);
      }
      return acc;
    }, []);
  }

  deleteSelectedChildren(): FractalDto[] {
    return this.selectedChildren.$value().map(child => {
      this.fractals.delete(child.cursor);
      return child.dto;
    });
  }

  updateSelectedChildren(): ControlDto[] {
    return this.selectedChildren.$value().reduce((acc: ControlDto[], fractal) => {
      if (fractal.form.dirty) acc = [...acc, ...fractal.update()];
      return acc;
    }, []);
  }
}
