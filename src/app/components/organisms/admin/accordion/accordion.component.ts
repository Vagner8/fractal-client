import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule, MatIconModule } from '@mat';
import { PanelComponent } from '../panel/panel.component';
import { IFractal } from '@types';
import { StatesService } from '@services';
import { TableComponent } from '@components/atoms';
import { CAppFractals } from '@constants';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, TableComponent, PanelComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  @Input() fractal!: IFractal;
  @Input() ancestors!: IFractal[];
  ss = inject(StatesService);

  AppFractals = CAppFractals;

  closed(fractal: IFractal): void {
    this.ss.currentFractal.set(fractal.parent);
  }

  afterExpand(fractal: IFractal): void {
    this.ss.currentFractal.set(fractal);
  }
}
