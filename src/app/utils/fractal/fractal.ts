import { IControlDto, IFractal, IFractalDto, FractalInitOptions, IControls, IFractals } from '@types';
import { FormRecord } from '@angular/forms';
import { ConstAppFractals } from '@constants';
import { Controls } from './maps/controls';
import { Fractals } from './maps/fractals';

export class Fractal implements IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControls;
  fractals: IFractals;
  isCollection: boolean;

  constructor(dto: IFractalDto, parent?: IFractal | null, options?: FractalInitOptions) {
    this.dto = dto;
    this.form = new FormRecord({});
    this.parent = parent ? parent : ({} as IFractal);
    this.controls = new Controls(this, options);
    this.fractals = new Fractals(dto.fractals, this);
    this.cursor = this.controls.getControlData('Cursor');
    this.isCollection = parent?.cursor === ConstAppFractals.Collections;
  }

  get ancestors(): IFractal[] {
    const ancestors: IFractal[] = [];
    for (let current = this.parent; current; current = current.parent) ancestors.push(current);
    return ancestors;
  }

  update(): IControlDto[] {
    const acc: IControlDto[] = [];
    for (const control of this.controls.values()) {
      if (control.form.dirty) acc.push(control.syncWithForm());
    }
    return acc;
  }

  addNewChildren(newFractals: IFractal[]): IFractalDto[] {
    return newFractals.reduce((acc: IFractalDto[], child) => {
      if (child.form.dirty) {
        child.form.markAsPristine();
        const cursor = child.controls.getKnown('Cursor')?.getFromControl('data').value;
        child.cursor = cursor;
        const oc = this.controls.getKnown('Oc');
        if (cursor && oc) {
          this.fractals.set(cursor, child);
          oc.pushSplitData(cursor);
          acc.push(child.dto);
        }
      }
      return acc;
    }, []);
  }

  updateSelectedChildren(selectedFractals: IFractal[]): IControlDto[] {
    return selectedFractals.reduce((acc: IControlDto[], fractal) => {
      if (fractal.form.dirty) acc = [...acc, ...fractal.update()];
      return acc;
    }, []);
  }

  deleteSelectedChildren(selectedFractals: IFractal[]): IFractalDto[] {
    return selectedFractals.map(({ dto, cursor }) => {
      this.controls.getKnown('Oc')?.deleteSplitData(cursor);
      this.fractals.delete(cursor);
      return dto;
    });
  }
}
