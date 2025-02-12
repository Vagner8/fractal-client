import { Component, inject, Input, OnInit } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { SelectService } from '@services';
import { Fractal } from '@types';
import { isFractal } from '@utils';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() fractal!: Fractal;
  @Input() columns: string[] = [];
  @Input() dataSource: unknown[] = [];
  ss = inject(SelectService);
  isFractals = false;

  ngOnInit(): void {
    this.isFractals = isFractal(this.dataSource[0]);
  }
}
