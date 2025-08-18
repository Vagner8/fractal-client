import { Component, inject } from '@angular/core';
import { Table } from '@components/atoms';
import { FractalService } from '@services';
import { ICollectionState } from '@types';

@Component({
  selector: 'app-tables',
  imports: [Table],
  templateUrl: './tables.html',
  styleUrl: './tables.scss',
})
export class Tables {
  fs = inject(FractalService);

  onChildHold(): void {
    this.onCollectionHold(this.fs.selectedChildren);
  }

  onChildTouch(cursor: string): void {
    this.onCollectionTouch(this.fs.selectedChildren, cursor);
  }

  onControlHold(): void {
    this.onCollectionHold(this.fs.selectedControls);
  }

  onControlTouch(cursor: string): void {
    this.onCollectionTouch(this.fs.selectedControls, cursor);
  }

  onChildrenControlHold(): void {
    this.onCollectionHold(this.fs.selectedChildrenControls);
  }

  onChildrenControlTouch(cursor: string): void {
    this.onCollectionTouch(this.fs.selectedChildrenControls, cursor);
  }

  onCollectionHold(state: ICollectionState): void {
    state.toggleAll();
    this.fs.resetOthers(state);
  }

  onCollectionTouch(state: ICollectionState, cursor: string): void {
    state.toggle(cursor);
    this.fs.resetOthers(state);
  }
}
