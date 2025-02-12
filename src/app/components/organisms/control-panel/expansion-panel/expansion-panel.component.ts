import { Component, inject, Input, OnInit, output, viewChild } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatExpansionPanel,
  MatIconModule,
  MatTableModule,
} from '@mat';
import { SelectService } from '@services';
import { Fractal } from '@types';
import { TableComponent } from '@components/atoms';
import { ConstIndicators } from '@constants';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    TableComponent,
    TableComponent,
  ],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent implements OnInit {
  @Input() fractal!: Fractal;
  ss = inject(SelectService);
  panel = viewChild(MatExpansionPanel);
  closed = output<Fractal>();
  indicators = ConstIndicators;

  ngOnInit(): void {
    if (this.fractal.isRoot) {
      this.ss.$current.set(this.fractal);
      this.panel()?.open();
    }
  }

  afterExpand(fractal: Fractal): void {
    this.ss.$current.set(fractal);
  }
}
