import { Component, computed, inject } from '@angular/core';
import { Table } from '@components/atoms';
import { FractalService } from '@services';
import { RowEmitType } from '@types';

@Component({
  selector: 'app-view',
  imports: [Table],
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class View {
  fs = inject(FractalService);

  onHeldControl(): void {
    this.fs.selectedControls.toggleAll(this.fs.selectedFractal.value);
  }

  onTouchControl(cursor: string): void {
    const control = this.fs.selectedFractal.$value()?.findControl(cursor);
    if (control) {
      this.fs.selectedControls.toggle(control);
    }
  }

  onHoldChild(): void {
    this.fs.selectedChildren.toggleAll(this.fs.selectedFractal.value);
  }

  onTouchChild(cursor: string): void {
    const child = this.fs.selectedFractal.$value()?.findChild(cursor);
    if (child) {
      this.fs.selectedChildren.toggle(child);
    }
  }
}
