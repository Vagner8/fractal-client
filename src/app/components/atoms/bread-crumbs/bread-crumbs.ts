import { Component, computed, inject, input, output } from '@angular/core';
import { MatButtonModule, MatGridListModule, MatIcon } from '@mat';
import { FractalService } from '@services';
import { Fractal } from '@types';
import { getAncestors } from '@utils';

@Component({
  selector: 'app-bread-crumbs',
  imports: [MatButtonModule, MatGridListModule, MatIcon],
  templateUrl: './bread-crumbs.html',
  styleUrl: './bread-crumbs.scss',
})
export class BreadCrumbs {
  fs = inject(FractalService);
  crumbClick = output<Fractal | null>();
  $crumbs = computed<Fractal[]>(getAncestors(this.fs.selectedFractal.$value));
}
