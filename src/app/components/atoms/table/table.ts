import { Component, computed, inject, input, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatCardModule, MatTableModule } from '@mat';
import { FractalService } from '@services';
import { ControlDto, Fractal } from '@types';

interface TdContentProps {
  index: number;
  cursor: string;
  column: string;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, TapDirective, MatCardModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  $like = input<'children' | 'controls'>('children');
  $title = input<string | null>('');
  $fractal = input<Fractal | null>();
  $selectedRows = input<string[]>([]);

  fs = inject(FractalService);

  $isChildren = computed(() => this.$like() === 'children');
  $columns = computed(() =>
    this.$isChildren()
      ? this.$fractal()?.getStringsData('Children controls')
      : this.fs.$app()?.getStringsData('Control keys'),
  );
  $dataSource = computed(() => this.$fractal()?.getStringsData(this.$isChildren() ? 'Children' : 'Controls') ?? []);

  heldRow = output<string>();
  touchedRow = output<string>();

  tdContent({ column, index, cursor }: TdContentProps): string | number {
    if (column === 'No.') {
      return index + 1;
    }

    if (this.$isChildren()) {
      return column === 'Cursor' ? cursor : (this.$fractal()?.findChild([cursor])?.getStringData([column]) ?? '');
    } else {
      return this.$fractal()?.findControl([cursor])?.[column as keyof ControlDto] ?? '';
    }
  }
}
