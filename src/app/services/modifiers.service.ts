import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { IControl, IFractal } from '@types';
import { DataService } from './data.service';
import { FractalService } from './fractal.service';
import { CModifiers } from '@constants';
import { ControlsModificationSet, FractalsModificationSet } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);
  private readonly fs = inject(FractalService);

  newTouched(): void {
    if (this.ss.$onEditPage()) {
      this.newTouchedOnEditPage();
    } else {
      this.newTouchedOnTablePage();
    }
  }

  newTouchedOnEditPage(): void {}

  newTouchedOnTablePage(): void {}

  edit(): void {
    this.fs.navigateModifier(CModifiers.Edit);
  }

  save(): void {
    const fms = new FractalsModificationSet();
    const cms = new ControlsModificationSet();

    fms.toAdd.length > 0 && this.ds.addFractals(fms.toAdd).subscribe();
    cms.toAdd.length > 0 && this.ds.addControls(cms.toAdd).subscribe();
    cms.toUpdate.length > 0 && this.ds.updateControls(cms.toUpdate).subscribe();
  }
}
