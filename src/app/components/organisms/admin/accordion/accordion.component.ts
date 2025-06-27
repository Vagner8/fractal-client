import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule, MatIconModule } from '@mat';
import { PanelComponent } from '../panel/panel.component';
import { IFractal } from '@types';
import { StatesService } from '@services';
import { TableComponent } from '@components/atoms';
import { APP_FRACTALS } from '@constants';

@Component({
  selector: 'app-accordion',
  imports: [MatIconModule, MatExpansionModule, TableComponent, PanelComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  @Input() fractal!: IFractal;
  @Input() ancestors!: IFractal[];
  ss = inject(StatesService);

  AppFractals = APP_FRACTALS;

  closed(fractal: IFractal): void {
    // this.ss.selectedFractal.set(fractal.parent);
  }

  afterExpand(fractal: IFractal): void {
    // this.ss.selectedParentFractal.set(fractal);
  }
}
