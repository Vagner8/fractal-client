import { Component, inject, Input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { SelectService } from '@services';
import { ControlKeys, Fractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  ss = inject(SelectService);
  @Input() printControls = false;
  @Input() fractal!: Fractal;

  get columns(): string[] {
    return this.printControls ? [ControlKeys.indicator, ControlKeys.data] : this.fractal.sort;
  }

  get dataSource(): unknown[] {
    return this.printControls ? this.fractal.controls : this.fractal.children;
  }
}
