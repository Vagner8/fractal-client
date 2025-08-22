import { Component, computed, inject, input, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { FractalService } from '@services';
import { ControlDto, Fractal, FractalFields } from '@types';

interface TdContentProps {
  index: number;
  cursor: string;
  column: string;
}

interface TableData {
  columns(): string[] | undefined;
  dataSource(): string[] | undefined;
  tdContent(props: TdContentProps): string | null | undefined;
}

type TablesData = Record<FractalFields, TableData>;
@Component({
  selector: 'app-table',
  imports: [MatTableModule, TapDirective],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  $like = input<FractalFields>('children');
  $fractal = input<Fractal | null>();
  $selectedCard = input<FractalFields | null>(null);
  $selectedRows = input<string[]>([]);

  fs = inject(FractalService);

  rowHold = output<string>();
  rowTouch = output<string>();

  $tablesData = computed<TableData>(() => {
    const tablesData: TablesData = {
      children: {
        columns: () => this.$fractal()?.getSplittableData('children controls'),
        dataSource: () => this.$fractal()?.getSplittableData('children'),
        tdContent: ({ column, cursor }) =>
          column === 'cursor' ? cursor : this.$fractal()?.findChild([cursor])?.getTextData([column]),
      },
      controls: {
        columns: () => this.fs.$app()?.getSplittableData('control keys'),
        dataSource: () => this.$fractal()?.getSplittableData('controls'),
        tdContent: ({ column, cursor }) => this.$fractal()?.findControl([cursor])?.[column as keyof ControlDto],
      },
      childrenControls: {
        columns: () =>
          this.fs
            .$app()
            ?.getSplittableData('control keys')
            .filter((key) => key !== 'data'),
        dataSource: () => this.$fractal()?.getSplittableData('children controls'),
        tdContent: ({ column, cursor }) => this.$fractal()?.findChildrenControl(cursor)?.[column as keyof ControlDto],
      },
    };

    return tablesData[this.$like()];
  });
}
