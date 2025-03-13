import { Component, inject, Input } from '@angular/core';
import { FractalCollectionComponent, FractalControlsComponent } from '@components/molecules';
import { MatExpansionModule, MatIconModule } from '@mat';
import { PanelComponent } from '../panel/panel.component';
import { IFractal } from '@types';
import { FractalService } from '@services';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, FractalControlsComponent, FractalCollectionComponent, PanelComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  @Input() fractal!: IFractal;
  @Input() ancestors!: IFractal[];
  fs = inject(FractalService);

  afterExpand(fractal: IFractal): void {
    this.fs.currentFractal.set(fractal);
  }

  afterCollapse(fractal: IFractal): void {
    this.fs.currentFractal.set(fractal.parent);
  }
}
