import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { IControl, IControlDto, IFractal, IFractalDto } from '@types';
import { DataService } from './data.service';
import { ControlFactory, FractalFactory } from '@utils';
import { FractalService } from './fractal.service';
import { CIndicators, CNavigableModifiers, CWords } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);
  private readonly fs = inject(FractalService);

  private current!: IFractal;

  private oc!: IControl;
  private ocCreated = false;
  private occ!: IControl;
  private occCreated = false;

  private newFractals: IFractalDto[] = [];
  private newControls: IControlDto[] = [];
  private updateControls: IControlDto[] = [];

  new(current: IFractal, modifier: IFractal): void {
    const selectedForm = this.ss.selectedForm.value;
    if (selectedForm) {
      const newControl = ControlFactory(selectedForm);
      newControl.fullEditMode.set(true);
      selectedForm.newControls.push(newControl);
    } else {
      this.ss.selectedChildren.push(FractalFactory(current));
      this.navigateToEditPage(modifier);
    }
  }

  edit(modifier: IFractal): void {
    if (!this.ss.$editPageActivated()) {
      this.navigateToEditPage(modifier);
    }
  }

  private saveInit(current: IFractal): void {
    this.current = current;
    this.newFractals = [];
    this.newControls = [];
    this.updateControls = [];
    [this.oc, this.ocCreated] = current.controls.getOneAutoCreation('Oc');
    [this.occ, this.occCreated] = current.controls.getOneAutoCreation('Occ');
    this.ocCreated && this.newControls.push(this.oc.dto);
    this.occCreated && this.newControls.push(this.occ.dto);
  }

  private saveControls(fractal: IFractal): void {
    for (const control of fractal.newControls.value) {
      if (control.form.dirty) {
        const [newControl, error] = fractal.controls.setOne(control);
        newControl.fullEditMode.set(false);
        if (error) {
          newControl.form.setErrors(error.formError);
        } else {
          this.occ.push(newControl.dto.indicator);
          fractal.cursor !== CWords.New && this.newControls.push(newControl.dto);
        }
      }
    }
  }

  private saveNewFractals(fractal: IFractal): void {
    fractal.cursor = this.createCursor(this.oc);
    fractal.controls.setOne(ControlFactory(fractal, { indicator: CIndicators.Cursor, data: fractal.cursor }));
    this.oc.push(fractal.cursor);
    this.current.fractals.set(fractal.cursor, fractal);
    this.newFractals.push(fractal.dto);
    fractal.newControls.clear();
  }

  save(current: IFractal): void {
    this.saveInit(current);

    for (const fractal of this.ss.selectedChildren.value) {
      this.saveControls(fractal);
      if (fractal.cursor === CWords.New && fractal.controls.size) {
        this.saveNewFractals(fractal);
      }
    }

    if (this.newFractals.length) {
      this.ocCreated || this.updateControls.push(this.oc.dto);
      this.occCreated || this.updateControls.push(this.occ.dto);
      console.log('🚀 ~ this.newFractals:', this.newFractals);
    }

    if (this.newControls.length) {
      console.log('🚀 ~ this.newControls:', this.newControls);
    }

    if (this.updateControls.length) {
      console.log('🚀 ~ this.updateControls:', this.updateControls);
    }

    // if (this.newFractals.length) {
    //   this.ocCreated || this.updateControls.push(this.oc.dto);
    //   this.occCreated || this.updateControls.push(this.occ.dto);
    //   this.ds.addFractals(this.newFractals).subscribe();
    // }

    // if (this.newControls.length) {
    //   this.ds.addControls(this.newControls).subscribe();
    // }

    // if (this.updateControls.length) {
    //   this.ds.updateControls(this.updateControls).subscribe();
    // }

    this.ss.selectedChildren.refresh();
  }

  private createCursor(oc: IControl): string {
    return String(
      oc.toNumbers.reduce((acc, cursor) => {
        if (cursor > acc) {
          acc = cursor;
        }
        return acc;
      }, 0) + 1
    );
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
