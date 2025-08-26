import { Component, inject, input, output } from '@angular/core';
import { TapEvents } from '@directives';
import { MatTableModule } from '@mat';
import { ControlView } from '@molecules';
import { EventsService, StatesService } from '@services';
import { Fractal, FractalFields, ICollectionState } from '@types';

type TablesData = Record<FractalFields, TableData>;

interface TableData {
  columns(): string[] | undefined;
  dataSource(): string[] | undefined;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, TapEvents, ControlView],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  $like = input<FractalFields>('children');
  $state = input.required<ICollectionState>();
  $fractal = input<Fractal | null>();

  ss = inject(StatesService);
  es = inject(EventsService);

  rowHold = output<string>();
  rowTouch = output<string>();

  tablesData: TablesData = {
    children: {
      columns: () => this.$fractal()?.getSplittableData('children controls'),
      dataSource: () => this.$fractal()?.getSplittableData('children'),
    },
    controls: {
      columns: () => this.ss.$app()?.getSplittableData('control keys'),
      dataSource: () => this.$fractal()?.getSplittableData('controls'),
    },
    childrenControls: {
      columns: () =>
        this.ss
          .$app()
          ?.getSplittableData('control keys')
          .filter((key) => key !== 'data'),
      dataSource: () => this.$fractal()?.getSplittableData('children controls'),
    },
  };

  onRowHold(cursor: string): void {
    this.$state().toggle(cursor);
  }
}
