import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { IControl, IControlDto, IFractal, IFractalDto } from '@types';
import { DataService } from './data.service';
import { ControlFactory, FractalFactory } from '@utils';
import { FractalService } from './fractal.service';
import { CNavigableModifiers } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);
  private readonly fs = inject(FractalService);

  private current!: IFractal;

  private oc!: [IControl, boolean];
  private occ!: [IControl, boolean];

  private newFractals: IFractalDto[] = [];
  private newControls: IControlDto[] = [];
  private updateControls: IControlDto[] = [];

  new(current: IFractal, modifier: IFractal): void {
    const selectedForm = this.ss.selectedForm.value;
    if (selectedForm) {
      selectedForm.newControls.push(ControlFactory(selectedForm));
    } else {
      this.ss.selectedChildren.push(FractalFactory(current));
      this.navigateToEditPage(modifier);
    }
  }

  edit(modifier: IFractal): void {
    const selectedForm = this.ss.selectedForm.value;
    if (!this.ss.$editPageActivated()) {
      this.navigateToEditPage(modifier);
    } else {
      selectedForm?.fullEditMode.toggle();
    }
  }

  private saveInit(current: IFractal): void {
    this.current = current;
    this.newFractals = [];
    this.newControls = [];
    this.oc = current.controls.getOrCreate('Oc');
    this.occ = current.controls.getOrCreate('Occ');
    const [oc, ocCreated] = this.oc;
    const [occ, occCreated] = this.occ;
    ocCreated && this.newControls.push(oc.dto);
    occCreated && this.newControls.push(occ.dto);
  }

  private saveControls(fractal: IFractal): void {
    const [occ] = this.occ;
    for (const control of fractal.newControls.value) {
      if (control.form.dirty) {
        const [newControl, error] = fractal.controls.setNew(control);
        if (error) {
          newControl.form.setErrors(error.formError);
        } else {
          occ.pushSplitData(newControl.dto.indicator);
          !fractal.cursor || this.newControls.push(newControl.dto);
        }
      }
    }
  }

  private saveNewFractals(fractal: IFractal): void {
    const [oc] = this.oc;
    fractal.cursor = this.createCursor(oc);
    oc.pushSplitData(fractal.cursor);
    this.current.fractals.set(fractal.cursor, fractal);
    this.newFractals.push(fractal.dto);
    fractal.fullEditMode.set(false);
    fractal.newControls.clear();
  }

  save(current: IFractal): void {
    this.saveInit(current);

    for (const fractal of this.ss.selectedChildren.value) {
      this.saveControls(fractal);
      if (!fractal.cursor && fractal.controls.size) {
        this.saveNewFractals(fractal);
      }
    }

    console.log('🚀 ~ newFractals:', this.newFractals);
    console.log('🚀 ~ newControls:', this.newControls);

    if (this.newFractals.length > 0) {
      this.ss.currentFractal.refresh();
      this.ss.selectedChildren.refresh();
    }
  }

  private createCursor(oc: IControl): string {
    return String(
      oc.reduce((acc, cursor) => {
        const cursorNumber = Number(cursor);
        if (cursorNumber > acc) {
          acc = cursorNumber;
        }
        return acc;
      }, 0) + 1
    );
  }

  delete(current: IFractal): void {
    // const toDelete: IFractalDto[] = [];
    // const selectedForm = this.ss.selectedForm.value;
    // const selectedChildren = this.ss.selectedChildren.value;
    // let source: IFractal[] = [];
    // if (selectedForm) source = [selectedForm];
    // if (!selectedForm && selectedChildren.length > 0) source = selectedChildren;
    // for (const fractal of source) {
    //   this.orderChildren?.deleteSplitData(fractal.cursor);
    //   current.fractals.delete(fractal.cursor);
    //   toDelete.push(fractal.dto);
    // }
    // if (toDelete.length > 0) {
    //   this.ds.deleteFractals(toDelete).subscribe();
    //   this.orderChildren && this.ds.updateControls([this.orderChildren.dto]).subscribe();
    //   this.ss.currentFractal.refresh();
    //   this.ss.selectedChildren.refresh();
    // }
  }

  private navigateToEditPage({ cursor }: IFractal): void {
    if (
      Object.hasOwn(CNavigableModifiers, cursor) &&
      (!this.ss.selectedChildren.isEmpty || !this.ss.currentFractal.isEmpty)
    ) {
      this.fs.navigateModifier(CNavigableModifiers.Edit);
    }
  }
}
