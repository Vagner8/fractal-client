import { Component, computed, input, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { ControlDto, Fractal } from '@types';

interface TdContentProps {
  index: number;
  cursor: string;
  column: string;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, TapDirective],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  $like = input<'children' | 'controls'>('children');
  $fractal = input<Fractal | null>();
  $selectedRows = input<string[]>([]);

  $isChildren = computed(() => this.$like() === 'children');
  $columns = computed(() => this.$fractal()?.getStringsData(this.$isChildren() ? 'Occ' : 'Omc') ?? []);
  $dataSource = computed(() => this.$fractal()?.getStringsData(this.$isChildren() ? 'Oc' : 'Ooc') ?? []);

  heldRow = output<string>();
  touchedRow = output<string>();

  tdContent({ column, index, cursor }: TdContentProps): string | number {
    if (column === 'No.') {
      return index + 1;
    }

    if (this.$isChildren()) {
      return column === 'Cursor' ? cursor : (this.$fractal()?.findChild(cursor)?.getStringData(column) ?? '');
    } else {
      return this.$fractal()?.findControl(cursor)?.[column as keyof ControlDto] ?? '';
    }
  }
}
