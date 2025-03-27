import { Component, Input } from '@angular/core';
import { ConstOrder } from '@constants';
import { MatTableModule } from '@mat';
import { IControlMutableDto, IFractal } from '@types';
import { isConstOrderType } from '@utils';

@Component({
  selector: 'app-controls-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './controls-table.component.html',
  styleUrl: './controls-table.component.scss',
})
export class ControlsTableComponent {
  @Input() fractal!: IFractal;

  get columns(): (keyof IControlMutableDto)[] {
    return ['indicator', 'data', 'field'];
  }

  get dataSource(): string[] {
    return this.fractal.controls.getAndSplitControlData('Ooc');
  }

  tdContent(indicator: string): string {
    return isConstOrderType(indicator) ? ConstOrder[indicator] : indicator;
  }
}
