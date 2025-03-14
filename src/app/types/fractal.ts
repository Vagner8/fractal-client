import { IControlDto, IControlsDto, IControls } from './control';
import { FormRecord } from '@angular/forms';

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

  get ancestors(): IFractal[];

  update(): IControlDto[];
  addNewChildren(): IFractalDto[];
  deleteSelectedChildren(): IFractalDto[];
  updateSelectedChildren(): IControlDto[];
}
