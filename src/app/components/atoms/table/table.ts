import { Component, computed, inject, input, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatCardModule, MatTableModule } from '@mat';
import { FractalService } from '@services';
import { ControlDto, Fractal, FractalFields } from '@types';

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

type TablesData = Record<FractalFields, TableData>;
type FractalFieldsMap = Record<FractalFields, string>;

@Component({
  selector: 'app-table',
  imports: [MatTableModule, TapDirective, MatCardModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  $like = input<FractalFields>('children');
  $fractal = input<Fractal | null>();
  $selectedRows = input<string[]>([]);

  fs = inject(FractalService);

  rowHold = output<string>();
  rowTouch = output<string>();

  $tablesData = computed<TableData>(() => {
    const tablesData: TablesData = {
      children: {
        columns: this.$fractal()?.getStringsData('Children controls'),
        dataSource: this.$fractal()?.getStringsData('Children'),
        tdContent: ({ column, cursor }) =>
          column === 'Cursor' ? cursor : this.$fractal()?.findChild([cursor])?.getStringData([column]),
      },
      controls: {
        columns: this.fs.$app()?.getStringsData('Control keys'),
        dataSource: this.$fractal()?.getStringsData('Controls'),
        tdContent: ({ column, cursor }) => this.$fractal()?.findControl([cursor])?.[column as keyof ControlDto],
      },
      childrenControls: {
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

  fractalFieldsMap(): string {
    const map: FractalFieldsMap = {
      children: 'Children',
      controls: 'Controls',
      childrenControls: 'Children controls',
    };

    return map[this.$like()];
  }
}
