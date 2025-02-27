import { FormRecord } from '@angular/forms';
import { Fractal, FractalCollection, FractalDto, RecordControls } from '@types';
import { signal } from '@angular/core';
import { isFractal } from '../guards';
import { RecordControlsFactory } from '../records/record-controls-factory';
import { ControlFactory } from '../controls/control-factory';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  parent: FractalCollection;
  controls: RecordControls;
  form = new FormRecord({});
  $selected = signal(false);

  constructor({ dto, parent }: { dto: FractalDto; parent?: FractalCollection | null }) {
    this.dto = dto;
    this.parent = parent ? parent : ({} as FractalCollection);
    this.controls = this.createControls(this);
  }

  get default(): { sortOwnControls: string[] } {
    return {
      sortOwnControls: this.controls.keys,
    };
  }

  is(value: string | object): boolean {
    const cursor = this.controls.get('Cursor')?.get('data');
    if (isFractal(value)) return this === value;
    if (typeof value === 'object') return Object.values(value).includes(cursor);
    return value === cursor;
  }

  private createControls(fractal: Fractal): RecordControls {
    const { dto, form } = fractal;
    const record = new RecordControlsFactory();
    Object.entries(dto.controls).forEach(([key, controlDto]) => {
      const control = new ControlFactory(controlDto);
      form.addControl(key, control.form);
      record.record[key] = control;
    });
    return record;
  }
}
