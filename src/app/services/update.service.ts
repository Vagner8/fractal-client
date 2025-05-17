import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { IControl, IControlDto, IFractal, IFractalDto } from '@types';
import { DataService } from './data.service';
import { ControlFactory, FractalFactory } from '@utils';
import { FractalService } from './fractal.service';
import { CIndicators, CWords } from '@constants';

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

  new(): void {
    this.init();
    if (this.ss.$editPageActivated()) {
      this.ss.selectedForm.value && this.newControl(this.ss.selectedForm.value);
    } else {
      this.newFractal();
    }
  }

  private newFractal(): void {
    this.ss.selectedChildren.clear();

    const newFractal = FractalFactory(this.current, {
      indicators: this.current.controls.getOne('Occ')?.dataSplit.strings,
    });
    this.ss.selectedChildren.push(newFractal);
  }

  private newControl(selectedForm: IFractal): void {
    const newControl = ControlFactory(selectedForm);
    newControl.fullEditMode.set(true);
    selectedForm.newControls.push(newControl);
  }

  edit(): void {
    this.init();
  }

  save(): void {
    for (const fractal of this.ss.selectedChildren.value) {
      this.saveControls(fractal);
      if (fractal.cursor === CWords.New && fractal.controls.size) {
        this.saveFractals(fractal);
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

    this.ss.currentFractal.refresh();
    this.ss.selectedChildren.refresh();
  }

  private init(): void {
    if (this.ss.currentFractal.value) {
      this.current = this.ss.currentFractal.value;
    } else {
      throw new Error('No current fractal');
    }

    if (this.ss.currentFractal.value) {
      this.current = this.ss.currentFractal.value;
    } else {
      throw new Error('No current fractal');
    }

    this.newFractals = [];
    this.newControls = [];
    this.updateControls = [];
    [this.oc, this.ocCreated] = this.current.controls.getOneWithAutoCreation('Oc');
    [this.occ, this.occCreated] = this.current.controls.getOneWithAutoCreation('Occ');
    this.ocCreated && this.newControls.push(this.oc.dto);
    this.occCreated && this.newControls.push(this.occ.dto);
  }

  private saveFractals(fractal: IFractal): void {
    fractal.cursor = String(this.oc.dataSplit.strings.length + 1);
    fractal.controls.setOne(ControlFactory(fractal, { indicator: CIndicators.Cursor, data: fractal.cursor }));
    this.oc.dataSplit.set(fractal.cursor);
    this.current.fractals.set(fractal.cursor, fractal);
    this.newFractals.push(fractal.dto);
  }

  private saveControls(fractal: IFractal): void {
    for (const newControl of fractal.newControls.value) {
      if (newControl.form.dirty) {
        newControl.fullEditMode.set(false);
        const [control, error] = fractal.controls.setOne(newControl);
        if (error) {
          control.form.setErrors(error.formError);
        } else {
          this.occ.dataSplit.set(control.dto.indicator);
          if (fractal.cursor !== CWords.New) {
            this.newControls.push(control.dto);
          }
        }
      }
    }
    this.updateControls = [...this.updateControls, ...fractal.updateControls.value];
    fractal.newControls.clear();
    fractal.updateControls.clear();
  }
}
