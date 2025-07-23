import { Component, computed, inject, input } from '@angular/core';
import { CUSTOM_CHILDREN_COLUMNS } from '@constants';
import { TapDirective } from '@directives';
import { MatButtonModule, MatTableModule } from '@mat';
import { StatesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-collection',
  imports: [MatTableModule, MatButtonModule, TapDirective],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent {
  $fractal = input<Fractal | null>();

  $currentFractal = computed(() => this.$fractal() || this.ss.selectedCollection.$value());

  ss = inject(StatesService);

  getColumns = (fractal: Fractal): string[] => [...Object.values(CUSTOM_CHILDREN_COLUMNS), ...fractal.getArray('Occ')];

  tdContent({ index, cursor, indicator }: { index: number; cursor: string; indicator: string }): string | number {
    if (indicator === CUSTOM_CHILDREN_COLUMNS.NO) {
      return index + 1;
    }
    if (indicator === CUSTOM_CHILDREN_COLUMNS.CURSOR) {
      return cursor;
    }
    return this.$currentFractal()?.findChild([cursor])?.getString([indicator]) ?? '';
  }
}
