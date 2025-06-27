import { Component, inject, input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { StatesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-children',
  imports: [MatTableModule, TapDirective],
  templateUrl: './children.component.html',
  styleUrl: './children.component.scss',
})
export class ChildrenComponent {
  ss = inject(StatesService);

  $fractal = input.required<Fractal>();

  getColumns = (fractal: Fractal): string[] => ['No.', ...fractal.getArray('Occ')];

  tdContent = ({ index, column, indicator }: { index: number; column: string; indicator: string }): string | number =>
    column === 'No.' ? index + 1 : (this.$fractal()?.findChild([indicator])?.getString([column]) ?? '');
}
