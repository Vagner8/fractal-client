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

interface TableData {
  columns: string[] | undefined;
  dataSource: string[] | undefined;
  tdContent(props: TdContentProps): string | number | undefined;
}

type Like = 'Children' | 'Controls' | 'Children controls';
type TablesData = Record<Like, TableData>;

@Component({
  selector: 'app-table',
  imports: [MatTableModule, TapDirective, MatCardModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  $like = input<Like>('Children');
  $fractal = input<Fractal | null>();
  $selected = input(false);
  $selectedRows = input<string[]>([]);

  fs = inject(FractalService);

  holdRow = output<string>();
  touchRow = output<string>();

  $tablesData = computed<TableData>(() => {
    const tablesData: TablesData = {
      Children: {
        columns: this.$fractal()?.getStringsData('Children controls'),
        dataSource: this.$fractal()?.getStringsData('Children'),
        tdContent: ({ column, cursor }) =>
          column === 'Cursor' ? cursor : this.$fractal()?.findChild([cursor])?.getStringData([column]),
      },
      Controls: {
        columns: this.fs.$app()?.getStringsData('Control keys'),
        dataSource: this.$fractal()?.getStringsData('Controls'),
        tdContent: ({ column, cursor }) => this.$fractal()?.findControl([cursor])?.[column as keyof ControlDto],
      },
      'Children controls': {
        columns: this.fs
          .$app()
          ?.getStringsData('Control keys')
          .filter((key) => key !== 'data'),
        dataSource: this.$fractal()?.getStringsData('Children controls'),
        tdContent: ({ column, cursor }) => {
          return this.$fractal()?.findChildrenControl(cursor)?.[column as keyof ControlDto];
        },
      },
    };

    return tablesData[this.$like()];
  });
}
