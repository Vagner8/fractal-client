import { IControlDto, IControlsDto, IControlMap, IControl } from './control';
import { FormRecord } from '@angular/forms';
import { IFractalsState } from './states';
import { ConstOrder } from '@constants';
import { IAppMap, IndicatorData } from './common';

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

export interface IFractalMap extends IAppMap<IFractal> {
  getRecursively(test: string, fractals?: IFractalMap): IFractal | null;
}

export interface IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControlMap;
  fractals: IFractalMap;

  isCollection: boolean;

  newChildren: IFractalsState;
  selectedChildren: IFractalsState;

  order(sort: keyof typeof ConstOrder): string[];
  update(): IControlDto[];
  addControl(indicatorData: IndicatorData): IControl;
  updateNewChildren(): { newFractals: IFractalDto[]; ordersToAdd: IControlDto[]; ordersToUpdate: IControlDto[] };
  deleteSelectedChildren(): IFractalDto[];
  updateSelectedChildren(): IControlDto[];
}
