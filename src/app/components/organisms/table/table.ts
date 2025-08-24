import { Component, computed, inject, input, output, signal } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { ControlForm } from '@molecules';
import { FractalService } from '@services';
import { Control, ControlDto, Fractal, FractalFields, ICollectionState } from '@types';

type TablesData = Record<FractalFields, TableData>;

interface TdContentProps {
  index: number;
  cursor: string;
  column: string;
}

interface TdContent {
  data: string | null | undefined;
  control?: Control | null;
}

interface TableData {
  columns(): string[] | undefined;
  dataSource(): string[] | undefined;
  tdContent(props: TdContentProps): TdContent;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, TapDirective, ControlForm],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  $like = input<FractalFields>('children');
  $state = input.required<ICollectionState>();
  $fractal = input<Fractal | null>();

  fs = inject(FractalService);

  rowHold = output<string>();
  rowTouch = output<string>();

  $editMode = signal(false);
  $holdRows = signal<string[]>([]);

  $tablesData = computed<TableData>(() => {
    const tablesData: TablesData = {
      children: {
        columns: () => this.$fractal()?.getSplittableData('children controls'),
        dataSource: () => this.$fractal()?.getSplittableData('children'),
        tdContent: ({ column, cursor }) => {
          if (column === 'cursor') {
            return { data: cursor };
          }
          const control = this.$fractal()?.findChild([cursor])?.findControl([column]);
          return { data: control?.data, control };
        },
      },
      controls: {
        columns: () => this.fs.$app()?.getSplittableData('control keys'),
        dataSource: () => this.$fractal()?.getSplittableData('controls'),
        tdContent: ({ column, cursor }) => {
          const control = this.$fractal()?.findControl([cursor]);
          return { data: control?.[column as keyof ControlDto], control };
        },
      },
      childrenControls: {
        columns: () =>
          this.fs
            .$app()
            ?.getSplittableData('control keys')
            .filter((key) => key !== 'data'),
        dataSource: () => this.$fractal()?.getSplittableData('children controls'),
        tdContent: ({ column, cursor }) => {
          const control = this.$fractal()?.findChildrenControl(cursor);
          return { data: control?.[column as keyof ControlDto], control };
        },
      },
    };

    return tablesData[this.$like()];
  });

  onRowHold(cursor: string): void {
    this.rowHold.emit(cursor);
  }

  onRowTouch(cursor: string): void {
    this.rowTouch.emit(cursor);
    this.$state().toggle(cursor);
  }
}
