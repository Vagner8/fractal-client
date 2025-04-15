import {
  IFractal,
  IFractalDto,
  FractalInitOptions,
  IControls,
  IFractals,
  IBoolState,
  IControlsState,
  IControlDto,
  IControl,
} from '@types';
import { FormRecord } from '@angular/forms';
import { ConstAppFractals } from '@constants';
import { Controls } from './maps/controls';
import { Fractals } from './maps/fractals';
import { BoolState, ControlsState } from './states';

export class Fractal implements IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControls;
  fractals: IFractals;
  isCollection: boolean;

  newControls: IControlsState;
  fullEditMode: IBoolState;

  constructor(dto: IFractalDto, parent?: IFractal | null, options?: FractalInitOptions) {
    this.dto = dto;
    this.form = new FormRecord({});
    this.parent = parent || ({} as IFractal);
    this.controls = new Controls(this, options);
    this.fractals = new Fractals(dto.fractals, this);
    this.cursor = this.controls.getControlData('Cursor');
    this.isCollection = parent?.cursor === ConstAppFractals.Collections;

    this.newControls = new ControlsState([]);
    this.fullEditMode = new BoolState(false);
  }

  get ancestors(): IFractal[] {
    const ancestors: IFractal[] = [];
    for (let current = this.parent; current; current = current.parent) ancestors.push(current);
    return ancestors;
  }

  deleteFractals(fractals: IFractal[]): IFractalDto[] {
    const toDelete: IFractalDto[] = [];
    const orderChildren = this.controls.getKnown('Oc');
    for (const fractal of fractals) {
      orderChildren?.deleteSplitData(fractal.cursor);
      this.fractals.delete(fractal.cursor);
      toDelete.push(fractal.dto);
    }
    return toDelete;
  }

  addControls(): IControlDto[] {
    const controlsDto: IControlDto[] = [];
    // const orderOwnControls = this.controls.getKnown('Ooc');
    // const parentOrderChildrenControls = this.parent.controls.getKnown('Occ');
    // for (const control of this.newControls.value) {
    //   if (control.form.dirty) {
    //     const indicator = control.getFromControl('indicator').value;
    //     this.controls.set(indicator, control);
    //     orderOwnControls?.pushSplitData(indicator);
    //     parentOrderChildrenControls?.pushSplitData(indicator);
    //     controlsDto.push(control.dto);
    //   }
    // }
    // orderOwnControls && controlsDto.push(orderOwnControls.dto);
    // parentOrderChildrenControls && controlsDto.push(parentOrderChildrenControls.dto);
    // this.newControls.clear();
    return controlsDto;
  }

  updateControls(): IControlDto[] {
    const controlsDto: IControlDto[] = [];
    for (const control of this.controls.values()) {
      if (control.form.dirty) {
        const data = control.getFromControl('data');
        const field = control.getFromControl('field');
        if (data.dirty) control.dto.data = data.value;
        if (field.dirty) control.dto.field = field.value;
      }
    }
    return controlsDto;
  }

  deleteControls(controls: IControl[]): IControlDto[] {
    const controlsDto: IControlDto[] = [];
    // for (const { dto } of controls) {
    //   const orderOwnControls = this.controls.getKnown('Ooc');
    //   const parentOrderChildrenControls = this.parent.controls.getKnown('Occ');
    //   orderOwnControls?.deleteSplitData(dto.indicator);
    //   parentOrderChildrenControls?.deleteSplitData(dto.indicator);
    //   this.controls.delete(dto.indicator);
    //   controlsDto.push(dto);
    // }
    return controlsDto;
  }
}
