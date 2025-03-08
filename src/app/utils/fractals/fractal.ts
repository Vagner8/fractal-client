import {
  IControlDto,
  IFractal,
  IFractalDto,
  FractalInitOptions,
  IControlMap,
  IFractalMap,
  IControl,
  IndicatorData,
} from '@types';
import { FormRecord } from '@angular/forms';
import { FractalsState } from '../states';
import { ConstAppFractals, ConstIndicators, ConstOrder } from '@constants';
import { Controls } from '../controls/controls';
import { fractalsDefaultOrder } from './fractals-default-order';
import { Control, ControlDto } from '../controls';
import { getIndicatorData } from '../common';

export class Fractal implements IFractal {
  dto: IFractalDto;
  form: FormRecord;
  cursor: string;
  parent: IFractal;
  controls: IControlMap;
  fractals!: IFractalMap;
  isCollection: boolean;

  newChildren = new FractalsState();
  selectedChildren = new FractalsState();

  constructor(dto: IFractalDto, parent?: IFractal | null, options?: FractalInitOptions) {
    this.dto = dto;
    this.form = new FormRecord({});
    this.parent = parent ? parent : ({} as IFractal);
    this.controls = Controls(this, options);
    this.cursor = this.controls.getControlData('Cursor');
    this.isCollection = parent?.cursor === ConstAppFractals.Collections;
  }

  order(sort: keyof typeof ConstOrder): string[] {
    const result = this.controls.getControlDataAndSplit(sort);
    return result && result.length > 0 ? result : fractalsDefaultOrder(this, sort);
  }

  update(): IControlDto[] {
    const acc: IControlDto[] = [];
    for (const control of this.controls.values()) {
      if (control.form.dirty) acc.push(control.syncWithForm());
    }
    return acc;
  }

  addControl(indicator: IndicatorData): IControl {
    const order = new Control(new ControlDto(this.dto.id).setIndicator(indicator));
    this.controls.set(getIndicatorData(indicator), order);
    return order;
  }

  deleteSelectedChildren(): IFractalDto[] {
    return this.selectedChildren.$value().map(child => {
      this.fractals.delete(child.cursor);
      return child.dto;
    });
  }

  updateNewChildren(): { newFractals: IFractalDto[]; ordersToAdd: IControlDto[]; ordersToUpdate: IControlDto[] } {
    const ordersToAdd: IControlDto[] = [];
    const ordersToUpdate: IControlDto[] = [];

    let orderChildren = this.controls.get(ConstOrder['Order children']);
    let orderChildrenControls = this.controls.get(ConstOrder['Order children controls']);

    if (!orderChildren) {
      orderChildren = this.addControl('Order children');
      ordersToAdd.push(orderChildren.dto);
    } else {
      ordersToUpdate.push(orderChildren.dto);
    }

    if (!orderChildrenControls) {
      orderChildrenControls = this.addControl('Order children controls').updateSplitData(ConstIndicators.Cursor);
      ordersToAdd.push(orderChildrenControls.dto);
    }

    const newFractals = this.newChildren.$value().reduce((acc: IFractalDto[], child) => {
      if (child.form.dirty) {
        child.cursor = child.form.controls[ConstIndicators.Cursor].value.data;
        this.fractals.set(child.cursor, child);
        acc.push(child.dto);
        orderChildren.updateSplitData(child.cursor);
      }
      return acc;
    }, []);

    return { newFractals, ordersToAdd, ordersToUpdate };
  }

  updateSelectedChildren(): IControlDto[] {
    return this.selectedChildren.$value().reduce((acc: IControlDto[], fractal) => {
      if (fractal.form.dirty) acc = [...acc, ...fractal.update()];
      return acc;
    }, []);
  }
}
