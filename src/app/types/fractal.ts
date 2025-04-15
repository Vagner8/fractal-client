import { IControlsDto, IControls, IControlDto, IControl } from './control';
import { FormRecord } from '@angular/forms';
import { IBoolState, IControlsState } from './states';

export type FractalsDto = Record<string, IFractalDto>;

export interface FractalInitOptions {
  syncFormWithDto: boolean;
}

export interface IFractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: IControlsDto;
}

export interface IFractals extends Map<string, IFractal> {
  getFractalRecursively(cursor: string | undefined, fractals?: IFractals): IFractal | null;
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

  fullEditMode: IBoolState;

  get ancestors(): IFractal[];

  deleteFractals(fractals: IFractal[]): IFractalDto[];

  addControls(): IControlDto[];
  updateControls(): IControlDto[];
  deleteControls(controls: IControl[]): IControlDto[];
}
