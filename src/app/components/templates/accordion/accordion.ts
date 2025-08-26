import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@mat';
import { FractalForm, Table } from '@organisms';
import { CreationService, StatesService } from '@services';
import { FractalFields } from '@types';

@Component({
  selector: 'app-accordion',
  imports: [Table, FractalForm, MatExpansionModule, NgTemplateOutlet],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {
  ss = inject(StatesService);
  cs = inject(CreationService);

  onPanelOpened(field: FractalFields): void {
    this.ss.$selectedCollectionState.set(this.ss.collectionStates[field]);
    this.ss.clearCollectionsStates();
  }
}
