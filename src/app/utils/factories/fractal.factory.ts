import { IFractal, IFractalDto, IControls, IFractals, IFractalSetStates, IFractalTableView } from '@types';
import { FormRecord } from '@angular/forms';
import { CAppFractals, CWords } from '@constants';
import { ControlsMap } from '../maps/controls.map';
import { FractalsMap } from '../maps/fractals.map';
import { FractalDto } from './fractal-dto.factory';
import { FractalStates } from './fractal-states.factory';
import { FractalTableView } from './fractal-table-view.factory';

interface FractalProps {
  dto?: IFractalDto;
  parent?: IFractal;
}

export class Fractal implements IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControls;
  fractals: IFractals;
  isCollection: boolean;

  states: IFractalSetStates;
  tableView: IFractalTableView;

  constructor(props?: FractalProps) {
    const { dto, parent = { dto: { id: 'no parent' } } as IFractal } = props || {};
    this.dto = dto || new FractalDto(parent.dto.id);
    this.form = new FormRecord({});
    this.parent = parent || ({} as IFractal);
    this.controls = new ControlsMap(this);
    this.fractals = new FractalsMap(this);
    this.cursor = this.controls.getOne('Cursor')?.dto.data ?? CWords.New;
    this.isCollection = parent?.cursor === CAppFractals.Collections;

    this.states = new FractalStates(this);
    this.tableView = new FractalTableView(this);
  }

  get ancestors(): IFractal[] {
    const ancestors: IFractal[] = [];
    for (let current = this.parent; current; current = current.parent) ancestors.push(current);
    return ancestors;
  }
}
