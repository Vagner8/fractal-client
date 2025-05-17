import { IControlsDto, IControls, ControlData } from './control.types';
import { FormRecord } from '@angular/forms';
import { IControlsDtoState, IControlsState } from './states.types';
import { AppError } from './common.types';

export type FractalsDto = Record<string, IFractalDto>;

interface FractalData {
  controlsData: ControlData[];
}

export interface FractalFactoryOptions {
  indicators?: string[];
  fractalsData?: FractalData[];
  controlsData?: ControlData[];
}

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
  newControls: IControlsState;
  updateControls: IControlsDtoState;
  get ancestors(): IFractal[];
}
