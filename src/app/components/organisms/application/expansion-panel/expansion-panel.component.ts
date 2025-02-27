import { Component, Input, OnInit, output, viewChild } from '@angular/core';
import { MatButtonModule, MatExpansionModule, MatExpansionPanel, MatIconModule } from '@mat';
import { ConstAppFractals } from '@constants';
import { FractalCollectionComponent, ControlsComponent } from '@components/molecules';
import { Fractal } from '@types';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatIconModule, ControlsComponent, FractalCollectionComponent],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent implements OnInit {
  @Input() fractal!: Fractal;
  // ss = inject(SelectService);
  panel = viewChild(MatExpansionPanel);
  closed = output<Fractal>();

  // Indicators = ConstIndicators;
  // Collections = ConstCollections;
  // ControlFormKeys = ConstControlFormKeys.strings;

  ngOnInit(): void {
    if (this.fractal.is(ConstAppFractals.App)) {
      // this.ss.currentFractal.set(this.fractal);
      this.panel()?.open();
    }
  }

  afterExpand(fractal: Fractal): void {
    // this.ss.currentFractal.set(fractal);
  }
}
