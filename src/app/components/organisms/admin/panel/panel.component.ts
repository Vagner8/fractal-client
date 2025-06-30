import { ChangeDetectionStrategy, Component, inject, Input, OnInit, output, viewChild } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel, MatIconModule } from '@mat';
import { FractalService, StatesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-panel',
  imports: [MatIconModule, MatExpansionModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent implements OnInit {
  @Input() fractal!: Fractal;
  @Input() ancestors!: Fractal[];
  ss = inject(StatesService);
  fs = inject(FractalService);

  expansionPanel = viewChild(MatExpansionPanel);

  closed = output();
  afterExpand = output<Fractal>();
  afterCollapse = output<Fractal>();

  ngOnInit(): void {
    this.ancestors.includes(this.fractal) && this.expansionPanel()?.open();
    this.ss.selectedCollection.value === this.fractal && this.expansionPanel()?.open();
  }
}
