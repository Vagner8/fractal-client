import { Component, inject } from '@angular/core';
import { TapDirective } from '@directives';
import { MatButtonModule, MatTableModule } from '@mat';
import { StatesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-children',
  imports: [MatTableModule, MatButtonModule, TapDirective],
  templateUrl: './children.component.html',
  styleUrl: './children.component.scss',
})
export class ChildrenComponent {
  ss = inject(StatesService);

  getColumns = (fractal: Fractal): string[] => ['No.', ...fractal.getArray('Occ')];

  tdContent = ({ index, cursor, indicator }: { index: number; cursor: string; indicator: string }): string | number =>
    indicator === 'No.'
      ? index + 1
      : (this.ss.selectedFractal.$value()?.findChild([cursor])?.getString([indicator]) ?? '');
}
