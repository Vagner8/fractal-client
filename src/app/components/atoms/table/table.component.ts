import { Component, inject, Input } from '@angular/core';
import { ConstControlDtoKeys } from '@constants';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { SelectService } from '@services';
import { Fractal } from '@types';

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
    return this.printControls ? [ConstControlDtoKeys.indicator, ConstControlDtoKeys.data] : this.fractal.sort();
  }

  get dataSource(): unknown[] {
    return this.printControls ? this.fractal.controls : this.fractal.childrenFractals;
  }
}
