import { IFractal, IFractalDto, FractalInitOptions, IControls, IFractals, IControlsState, IControl } from '@types';
import { FormRecord } from '@angular/forms';
import { CAppFractals, CWords } from '@constants';
import { Controls } from '../maps/controls';
import { Fractals } from '../maps/fractals';
import { ControlsState } from '../states';

export class Fractal implements IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControls;
  fractals: IFractals;
  isCollection: boolean;

  newControls: IControlsState;
  touchedControls: Set<IControl>;

  constructor(dto: IFractalDto, parent?: IFractal | null, options?: FractalInitOptions) {
    this.dto = dto;
    this.form = new FormRecord({});
    this.parent = parent || ({} as IFractal);
    this.controls = new Controls(this, options);
    this.fractals = new Fractals(dto.fractals, this);
    this.cursor = this.controls.getOne('Cursor')?.dto.data ?? CWords.New;
    this.isCollection = parent?.cursor === CAppFractals.Collections;
    this.newControls = new ControlsState([]);
    this.touchedControls = new Set<IControl>([]);
  }

  get ancestors(): IFractal[] {
    const ancestors: IFractal[] = [];
    for (let current = this.parent; current; current = current.parent) ancestors.push(current);
    return ancestors;
  }
}
