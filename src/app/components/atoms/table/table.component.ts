import { Component, inject, Input } from '@angular/core';
import { ConstControlFields, CControlMutable, COrders } from '@constants';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { StatesService } from '@services';
import { IControlMutableDto, IFractal } from '@types';
import { isConstOrderType } from '@utils';

interface TableData {
  columns(): string[];
  tdContent(indicator: string, column: string): string;
  dataSource(): string[];

  onHold?: (row: string) => void;
  onTouch?: (row: string) => void;
  selected?: (row: string) => void;
}

interface Tables {
  controls: TableData;
  children: TableData;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, TapDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements Tables {
  @Input() fractal!: IFractal;
  @Input() like: keyof Tables = 'children';
  ss = inject(StatesService);
  positionColumn = 'No.';

  children: TableData = {
    columns: () => [this.positionColumn, ...this.fractal.controls.getOneLikeStrings('Occ')],
    dataSource: () => this.fractal.controls.getOneLikeStrings('Oc'),

    tdContent: (indicator: string, column: string) => {
      const control = this.fractal.fractals.get(indicator)?.controls.get(column);
      return control?.dto.field === ConstControlFields.Select
        ? control.dto.data.split(':')[0]
        : (control?.dto.data ?? '');
    },

    onHold: row => this.ss.selectedChildrenFractals.toggleAll(this.fractal.fractals.get(row)),
    onTouch: row => this.ss.selectedChildrenFractals.toggle(this.fractal.fractals.get(row)),
    selected: row => this.ss.selectedChildrenFractals.has(this.fractal.fractals.get(row)),
  };

  controls: TableData = {
    columns: () => [this.positionColumn, ...Object.values(CControlMutable)],
    dataSource: () => this.fractal.parent.controls.getOneLikeStrings('Occ'),

    tdContent: (indicator: string, column: string) => {
      const value = this.fractal.controls.get(indicator)?.dto[column as keyof IControlMutableDto];
      return value && isConstOrderType(value) ? COrders[value] : (value ?? '');
    },
  };
}
