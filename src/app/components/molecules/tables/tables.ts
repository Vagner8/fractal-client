import { Component, inject, signal } from '@angular/core';
import { Table } from '@components/atoms';
import { FractalService } from '@services';
import { FractalFields, ICollectionState } from '@types';

@Component({
  selector: 'app-tables',
  imports: [Table],
  templateUrl: './tables.html',
  styleUrl: './tables.scss',
})
export class Tables {
  fs = inject(FractalService);

  onCardHoldOrTouch(field: FractalFields, state: ICollectionState): void {
    this.fs.resetOthers(state);
    this.fs.$fractalFields.set(field);
  }

  onCollectionHold(state: ICollectionState): void {
    state.toggleAll();
    this.fs.resetOthers(state);
  }

  onCollectionTouch(cursor: string, state: ICollectionState): void {
    state.toggle(cursor);
    this.fs.resetOthers(state);
  }
}
