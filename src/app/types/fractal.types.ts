import { IControlsDto, IControls } from './control.types';
import { FormRecord } from '@angular/forms';
import { AppError } from './common.types';
import { INewControlsState } from './states.types';

export type FractalsDto = Record<string, IFractalDto>;

export interface IFractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: IControlsDto;
}

export interface IFractals extends Map<string, IFractal> {
  parent: IFractal;
  setOne(cursor: string, fractal: IFractal): [IFractal, AppError | null];
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

  newControls: INewControlsState;

  get ancestors(): IFractal[];
}
