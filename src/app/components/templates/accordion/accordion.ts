import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@mat';
import { FractalForm, Table } from '@organisms';
import { CreationService, FractalService } from '@services';
import { FractalFields, ICollectionState } from '@types';

@Component({
  selector: 'app-accordion',
  imports: [Table, FractalForm, MatExpansionModule, NgTemplateOutlet],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {
  fs = inject(FractalService);
  cs = inject(CreationService);

  onPanelOpened(field: FractalFields): void {
    this.fs.$selectedCollectionState.set(this.fs.collectionStates[field]);
    this.fs.clearCollectionsStates();
  }
}
