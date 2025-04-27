import { IControlsDto, IControls } from './control.types';
import { FormRecord } from '@angular/forms';
import { IControlsDtoState, IControlsState } from './states.types';

export type FractalsDto = Record<string, IFractalDto>;

export interface IFractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: IControlsDto;
}

export interface IFractals extends Map<string, IFractal> {
  getByCursor(cursor: string | undefined, fractals?: IFractals): IFractal | null;
}

export interface IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControls;
  fractals: IFractals;
  isCollection: boolean;
  newControls: IControlsState;
  updateControls: IControlsDtoState;
  get ancestors(): IFractal[];
}
