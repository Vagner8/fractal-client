import { Component, inject, input } from '@angular/core';
import { CollectionComponent, ControlsComponent } from '@components/atoms';
import { MatExpansionModule, MatIconModule } from '@mat';
import { StatesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-accordion',
  imports: [MatIconModule, MatExpansionModule, ControlsComponent, CollectionComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  $fractal = input<Fractal | null>();
  ss = inject(StatesService);

  onOpened(fractal: Fractal): void {
    this.ss.selectedFractal.set(fractal);
  }

  onClosed(fractal: Fractal): void {
    this.ss.closedPanel.set(fractal);
  }
}
