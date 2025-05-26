import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { IControl, IFractal } from '@types';
import { DataService } from './data.service';
import { FractalService } from './fractal.service';
import { CModifiers } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);
  private readonly fs = inject(FractalService);

  private selectedParent!: IFractal;

  private oc!: IControl;
  private ocCreated = false;
  private occ!: IControl;
  private occCreated = false;

  newTouched(): void {
    if (this.ss.$onEditPage()) {
      this.newTouchedOnEditPage();
    } else {
      this.newTouchedOnTablePage();
    }
  }

  newTouchedOnEditPage(): void {
    if (this.ss.selectedFractalForm.isEmpty) {
      this.ss.newFractals.pushNew();
    }
  }

  newTouchedOnTablePage(): void {
    if (this.ss.selectedChildrenFractals.isEmpty) {
      this.ss.newFractals.pushNew();
    } else {
      this.ss.newFractals.setCopies(this.ss.selectedChildrenFractals.value);
    }
    this.ss.selectedChildrenFractals.clear();
    this.fs.navigateModifier(CModifiers.New);
  }

  edit(): void {
    this.init();
    this.fs.navigateModifier(CModifiers.Edit);
  }

  save(): void {
    console.log('🚀 ~ newFractals:', this.ss.newFractals.value);
    console.log('🚀 ~ selectedChildrenFractals:', this.ss.selectedChildrenFractals.value);
    console.log('🚀 ~ selectedFractalForm:', this.ss.selectedFractalForm.value);

    this.ss.selectedParentFractal.refresh();
    this.ss.selectedChildrenFractals.refresh();
  }

  private init(): void {
    if (this.ss.selectedParentFractal.value) {
      this.selectedParent = this.ss.selectedParentFractal.value;
    } else {
      throw new Error('Unable to get the selected parent fractal');
    }

    [this.oc, this.ocCreated] = this.selectedParent.controls.getOneWithAutoCreation('Oc');
    [this.occ, this.occCreated] = this.selectedParent.controls.getOneWithAutoCreation('Occ');
  }
}
