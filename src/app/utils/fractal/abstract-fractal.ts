import { FormRecord } from '@angular/forms';
import { FractalDto } from '@types';
import { ControlFactory } from '../control/control-factory';
import { signal } from '@angular/core';
import { RecordControls } from '../record/record-controls';

export abstract class AbstractFractal {
  dto: FractalDto;
  parent: AbstractFractal;
  controls: RecordControls;
  form = new FormRecord({});
  $selected = signal(false);

  constructor({ dto, parent }: { dto: FractalDto; parent?: AbstractFractal | null }) {
    this.dto = dto;
    this.parent = parent ? parent : ({} as AbstractFractal);
    this.controls = this.createControls(this);
  }

  is(test: string | object): boolean {
    const cursor = this.controls.get('Cursor');
    if (test instanceof AbstractFractal) return this === test;
    if (typeof test === 'object') return Object.values(test).includes(cursor);
    return test === cursor;
  }

  private createControls(fractal: AbstractFractal): RecordControls {
    const { dto, form } = fractal;
    const record = new RecordControls();
    Object.entries(dto.controls).forEach(([key, controlDto]) => {
      const control = new ControlFactory(controlDto);
      form.addControl(key, control.form);
      record.record[key] = control;
    });
    return record;
  }
}
