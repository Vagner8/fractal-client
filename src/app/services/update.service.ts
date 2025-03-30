import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { IControl, IControlDto, IFractal, IFractalDto } from '@types';
import { ConstControlFields, ConstControlMutable } from '@constants';
import { deleteSubstring, isConstControlMutableType } from '@utils';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);

  private fractalsToAdd: IFractalDto[] = [];
  private controlsToAdd: IControlDto[] = [];
  private controlsToUpdate: IControlDto[] = [];

  update(): void {
    this.fractalsToAdd = [];
    this.controlsToAdd = [];
    this.controlsToUpdate = [];

    const currentFractal = this.ss.currentFractal.value;
    const orderChildren = currentFractal?.controls.getKnown('Oc');
    if (currentFractal) {
      this.ss.selectedChildren.forEach(fractal => {
        if (!fractal.newControls.isEmpty) {
          this.addControls(fractal);
          fractal.newControls.clear();
        }
        if (!fractal.form.dirty) return;
        if (fractal.isNew && orderChildren) {
          this.fractalsToAdd.push(this.addFractal(currentFractal, fractal, orderChildren));
        }
        for (const control of fractal.controls.values()) {
          if (control.form.dirty) {
            if (fractal.fullEditMode.value) {
              this.controlsToUpdate.push(this.updateAllControlFields(control));
            } else {
              this.controlsToUpdate.push(this.updateControlDataField(control));
            }
            control.form.markAsPristine();
          }
        }
      });
    }

    this.ss.selectedChildren.refresh();
    if (this.fractalsToAdd.length > 0) {
      orderChildren && this.ds.updateControls([orderChildren.dto]).subscribe();
      this.ds.addFractals(this.fractalsToAdd).subscribe();
    }
    this.controlsToUpdate.length > 0 && this.ds.updateControls(this.controlsToUpdate).subscribe();
  }

  private addFractal(parent: IFractal, fractal: IFractal, orderChildren: IControl): IFractalDto {
    const cursor = fractal.controls.getKnown('Cursor')?.getFromControl('data').value;
    fractal.form.markAsPristine();
    fractal.cursor = cursor;
    parent.fractals.set(cursor, fractal);
    orderChildren?.pushSplitData(cursor);
    return fractal.dto;
  }

  private addControls(fractal: IFractal): void {
    const orderChildrenControls = this.ss.currentFractal.value?.controls.getKnown('Occ');
    fractal.newControls.value.forEach(control => {
      if (control.form.dirty) {
        const { value } = control.getFromControl('indicator');
        fractal.controls.set(value, control);
        this.controlsToAdd.push(control.dto);
        orderChildrenControls?.pushSplitData(value);
        control.form.markAsPristine();
      }
    });
    orderChildrenControls && this.ds.updateControls([orderChildrenControls.dto]).subscribe();
    this.ds.addControls(this.controlsToAdd).subscribe();
  }

  private updateControlDataField(control: IControl): IControlDto {
    const { data, field } = ConstControlMutable;
    const { value } = control.form.controls[data];
    if (control.form.controls[field].value === ConstControlFields.Select) {
      control.dto.data = `${value}:${deleteSubstring(control.dto.data, value)}`;
    } else {
      control.dto.data = value;
    }
    return control.dto;
  }

  private updateAllControlFields(control: IControl): IControlDto {
    for (const key in ConstControlMutable) {
      if (isConstControlMutableType(key)) {
        const form = control.form.controls[key];
        if (form.dirty) control.dto[key] = form.value;
      }
    }
    return control.dto;
  }
}
