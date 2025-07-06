import { Component, computed, inject, input } from '@angular/core';
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

  getColumns = (fractal: Fractal): string[] => ['No.', ...fractal.getArray('Occ')];

  tdContent = ({ index, cursor, indicator }: { index: number; cursor: string; indicator: string }): string | number =>
    indicator === 'No.' ? index + 1 : (this.$currentFractal()?.findChild([cursor])?.getString([indicator]) ?? '');
}
