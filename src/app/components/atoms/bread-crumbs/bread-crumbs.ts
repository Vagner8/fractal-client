import { Component, computed, inject, output } from '@angular/core';
import { MatButtonModule, MatGridListModule, MatIcon } from '@mat';
import { StatesService } from '@services';
import { Fractal } from '@types';
import { getAncestors } from '@utils';

@Component({
  selector: 'app-bread-crumbs',
  imports: [MatButtonModule, MatGridListModule, MatIcon],
  templateUrl: './bread-crumbs.html',
  styleUrl: './bread-crumbs.scss',
})
export class BreadCrumbs {
  ss = inject(StatesService);
  crumbClick = output<Fractal | null>();
  $crumbs = computed<Fractal[]>(getAncestors(this.ss.selectedFractal.$value));
}
