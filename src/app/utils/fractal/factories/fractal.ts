import { IFractal, IFractalDto, IControls, IFractals, IControlsState, IControlsDtoState } from '@types';
import { FormRecord } from '@angular/forms';
import { CAppFractals, CWords } from '@constants';
import { ControlsMap } from '../maps/controls.map';
import { FractalsMap } from '../maps/fractals.map';
import { ControlsDtoState, ControlsState } from '../states';
import { FractalDto } from './fractal-dto';
import { Control } from './control';

interface FractalOptions {
  populateFromOcc?: boolean;
}

interface FractalProps {
  dto?: IFractalDto;
  parent?: IFractal;
  options?: FractalOptions;
}

export class Fractal implements IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControls;
  fractals: IFractals;
  isCollection: boolean;

  newControls: IControlsState;
  updateControls: IControlsDtoState;

  constructor(props?: FractalProps) {
    const { dto, parent = { dto: { id: 'no parent' } } as IFractal, options } = props || {};
    this.dto = dto || new FractalDto(parent.dto.id);
    this.form = new FormRecord({});
    this.parent = parent || ({} as IFractal);
    this.controls = new ControlsMap(this);
    this.fractals = new FractalsMap(this);
    this.cursor = this.controls.getOne('Cursor')?.dto.data ?? CWords.New;
    this.isCollection = parent?.cursor === CAppFractals.Collections;
    this.newControls = new ControlsState([]);
    this.updateControls = new ControlsDtoState([]);
    if (options?.populateFromOcc) {
      const occ = parent.controls.getOne('Occ')?.dataSplit.strings;
      if (occ) {
        const newControls = occ.map(indicator => new Control({ parent: this, mutableFields: { indicator } }));
        this.newControls.set(newControls);
      }
    }
  }

  get ancestors(): IFractal[] {
    const ancestors: IFractal[] = [];
    for (let current = this.parent; current; current = current.parent) ancestors.push(current);
    return ancestors;
  }
}
