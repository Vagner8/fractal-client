import { Component, Input } from '@angular/core';
import { ConstOrder } from '@constants';
import { MatTableModule } from '@mat';
import { IControlMutableDto, IFractal } from '@types';
import { isConstOrderType } from '@utils';

@Component({
  selector: 'app-fractal-controls',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './fractal-controls.component.html',
  styleUrl: './fractal-controls.component.scss',
})
export class FractalControlsComponent {
  @Input() fractal!: IFractal;

  get columns(): (keyof IControlMutableDto)[] {
    return ['indicator', 'data', 'input'];
  }

  get dataSource(): string[] {
    return this.fractal.controls.getAndSplitControlData('Ooc');
  }

  tdContent(indicator: string): string {
    return isConstOrderType(indicator) ? ConstOrder[indicator] : indicator;
  }
}
