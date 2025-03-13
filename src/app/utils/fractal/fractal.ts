import { IControlDto, IFractal, IFractalDto, FractalInitOptions, IControls, IFractals } from '@types';
import { FormRecord } from '@angular/forms';
import { ConstAppFractals } from '@constants';
import { Controls } from './maps/controls';
import { FractalsState } from './states/fractals-state';
import { Fractals } from './maps/fractals';

export class Fractal implements IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControls;
  fractals: IFractals;
  isCollection: boolean;

  newChildren = new FractalsState();
  selectedChildren = new FractalsState();

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
    let current = this.parent;
    while (current) {
      ancestors.unshift(current);
      current = current.parent;
    }
    return ancestors;
  }

  update(): IControlDto[] {
    const acc: IControlDto[] = [];
    for (const control of this.controls.values()) {
      if (control.form.dirty) acc.push(control.syncWithForm());
    }
    return acc;
  }

  addNewChildren(): IFractalDto[] {
    return this.newChildren.$value().reduce((acc: IFractalDto[], child) => {
      if (child.form.dirty) {
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

  getFractalRecursively(cursor: string | undefined, fractals: IFractals = this.fractals): IFractal | null {
    if (!cursor) return null;
    if (cursor === this.cursor) return this;
    const result = fractals.get(cursor);
    if (result) return result;
    for (const fractal of fractals.values()) {
      const nestedResult = this.getFractalRecursively(cursor, fractal.fractals);
      if (nestedResult) return nestedResult;
    }
    return null;
  }

  updateSelectedChildren(): IControlDto[] {
    return this.selectedChildren.$value().reduce((acc: IControlDto[], fractal) => {
      if (fractal.form.dirty) acc = [...acc, ...fractal.update()];
      return acc;
    }, []);
  }

  deleteSelectedChildren(): IFractalDto[] {
    return this.selectedChildren.$value().map(({ dto, cursor }) => {
      this.controls.getKnown('Oc')?.deleteSplitData(cursor);
      this.fractals.delete(cursor);
      return dto;
    });
  }
}
