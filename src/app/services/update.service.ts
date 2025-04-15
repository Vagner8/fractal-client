import { inject, Injectable } from '@angular/core';
import { StatesService } from './states.service';
import { IFractal, IFractalDto } from '@types';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private readonly ds = inject(DataService);
  private readonly ss = inject(StatesService);

  save(current: IFractal): void {
    const newFractals: IFractalDto[] = [];
    const orderChildren = current.controls.getKnown('Oc');
    for (const fractal of this.ss.selectedChildren.value) {
      if (fractal.form.dirty) {
        const cursor = `${current.fractals.size}`;
        current.fractals.set(cursor, fractal);
        fractal.cursor = cursor;
        newFractals.push(fractal.dto);
        orderChildren?.pushSplitData(cursor);
      }
    }

    if (newFractals.length > 0) {
      this.ds.addFractals(newFractals).subscribe();
      orderChildren && this.ds.updateControls([orderChildren.dto]).subscribe();
      this.ss.currentFractal.refresh();
      this.ss.selectedChildren.refresh();
    }
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
}
