import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Table } from '@atoms';
import { MatExpansionModule } from '@mat';
import { FractalForm } from '@organisms';
import { CreationService, FractalService } from '@services';
import { FractalFields, ICollectionState } from '@types';

@Component({
  selector: 'app-tables',
  imports: [Table, FractalForm, MatExpansionModule, NgTemplateOutlet],
  templateUrl: './tables.html',
  styleUrl: './tables.scss',
})
export class Tables {
  fs = inject(FractalService);
  cs = inject(CreationService);

  onPanelOpened(field: FractalFields, state: ICollectionState): void {
    this.fs.clearCollectionStates({ exclude: [state] });
    this.fs.$selectedFractalField.set(field);
  }

  onCollectionHold(state: ICollectionState): void {
    this.fs.clearCollectionStates({ exclude: [state] });
    state.toggleAll();
  }

  onCollectionTouch(cursor: string, state: ICollectionState): void {
    this.fs.clearCollectionStates({ exclude: [state] });
    state.toggle(cursor);
  }
}
