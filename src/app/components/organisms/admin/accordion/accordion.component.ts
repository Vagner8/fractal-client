import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule, MatIconModule } from '@mat';
import { PanelComponent } from '../panel/panel.component';
import { IFractal } from '@types';
import { StatesService } from '@services';
import { CollectionTableComponent, ControlsTableComponent } from '@components/atoms';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, ControlsTableComponent, CollectionTableComponent, PanelComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  @Input() fractal!: IFractal;
  @Input() ancestors!: IFractal[];
  ss = inject(StatesService);

  closed(fractal: IFractal): void {
    this.ss.currentFractal.set(fractal.parent);
  }

  afterExpand(fractal: IFractal): void {
    this.ss.currentFractal.set(fractal);
  }
}
