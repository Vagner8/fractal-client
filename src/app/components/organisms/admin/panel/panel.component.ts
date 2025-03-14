import { ChangeDetectionStrategy, Component, inject, Input, OnInit, output, viewChild } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel, MatIconModule } from '@mat';
import { FractalService, StatesService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent implements OnInit {
  @Input() fractal!: IFractal;
  @Input() ancestors!: IFractal[];
  ss = inject(StatesService);
  fs = inject(FractalService);

  expansionPanel = viewChild(MatExpansionPanel);

  closed = output();
  afterExpand = output<IFractal>();
  afterCollapse = output<IFractal>();

  ngOnInit(): void {
    this.ancestors.includes(this.fractal) && this.expansionPanel()?.open();
    this.ss.currentFractal.$value() === this.fractal && this.expansionPanel()?.open();
  }
}
