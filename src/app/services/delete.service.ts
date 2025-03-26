import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { IControl, IControlDto, IFractal, IFractalDto } from '@types';
import { ConstAppFractals } from '@constants';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);

  delete(): void {
    const selectedControls = this.ss.selectedControls.$value();
    if (selectedControls.length > 0) {
      this.deleteControls(selectedControls);
      this.ss.selectedChildren.refresh();
    } else {
      this.deleteFractals();
      this.ss.currentFractal.refresh();
    }
  }

  private deleteFractals(): void {
    const fractalsToDelete: IFractalDto[] = [];
    const selectedChildrenToDelete: IFractal[] = [];

    const currentFractal = this.ss.currentFractal.$value();
    const orderChildren = currentFractal?.controls.getKnown('Oc');

    const editPageActivated = !!this.ss.$paramMap()?.get(ConstAppFractals.Modifiers);
    const selectedForm = this.ss.selectedForm.$value();
    const selectedChildren = this.ss.selectedChildren.$value();
    const dataSource = editPageActivated && selectedForm ? [selectedForm] : selectedChildren;

    if (currentFractal) {
      for (const fractal of dataSource) {
        if (!fractal.isNew) {
          orderChildren?.deleteSplitData(fractal.cursor);
          currentFractal.fractals.delete(fractal.cursor);
          fractalsToDelete.push(fractal.dto);
        }
        selectedChildrenToDelete.push(fractal);
      }
      this.ss.selectedChildren.deleteBunch(selectedChildrenToDelete);
    }

    if (fractalsToDelete.length > 0) {
      this.ds.deleteFractals(fractalsToDelete).subscribe();
      orderChildren && this.ds.updateControls([orderChildren.dto]).subscribe();
    }
  }

  private deleteControls(controls: IControl[]): void {
    const controlsToDelete: IControlDto[] = [];
    controls.forEach(control => {
      controlsToDelete.push(control.dto);
      control.parent?.controls.delete(control.dto.indicator);
    });

    controlsToDelete.length > 0 && this.ds.deleteControls(controlsToDelete).subscribe();
  }
}
