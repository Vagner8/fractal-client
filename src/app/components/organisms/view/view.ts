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

  onHoldRow({ parent, childCursor }: RowEmitType): void {
    this.fs.selectedChildren.toggleAll(parent.findChild(childCursor));
  }

  onTouchRow(cursor: string): void {
    const child = this.fs.selectedParent.$value()?.findChild(cursor);
    if (child) {
      this.fs.selectedChildren.toggle(child);
    }
  }
}
