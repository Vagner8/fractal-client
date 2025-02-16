import { Component, inject, Input, OnInit, output, viewChild } from '@angular/core';
import { MatButtonModule, MatExpansionModule, MatExpansionPanel, MatIconModule } from '@mat';
import { SelectService } from '@services';
import { Fractal } from '@types';
import { ConstControlFormKeys, ConstIndicators } from '@constants';
import { ChildrenControlsComponent, ControlsComponent } from '@components/molecules';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatIconModule, ControlsComponent, ChildrenControlsComponent],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent implements OnInit {
  @Input() fractal!: Fractal;
  ss = inject(SelectService);
  panel = viewChild(MatExpansionPanel);
  closed = output<Fractal>();
  indicators = ConstIndicators;
  controlFormKeys = ConstControlFormKeys.strings;

  ngOnInit(): void {
    if (this.fractal.isApp) {
      this.ss.setCurrentPanel(this.fractal);
      this.panel()?.open();
    }
  }

  afterExpand(fractal: Fractal): void {
    this.ss.setCurrentPanel(fractal);
  }
}
