import { Component, inject, Input } from '@angular/core';
import { ConstControlFields } from '@constants';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { StatesService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-collection-table',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './collection-table.component.html',
  styleUrl: './collection-table.component.scss',
})
export class CollectionTableComponent {
  @Input() fractal!: IFractal;
  ss = inject(StatesService);

  get columns(): string[] {
    return this.fractal.controls.getAndSplitControlData('Occ');
  }

  get dataSource(): string[] {
    return this.fractal.controls.getAndSplitControlData('Oc');
  }

  tdValue(cursor: string, column: string): string {
    const control = this.fractal.fractals.get(cursor)?.controls.get(column);
    if (!control) return '';
    return control.dto.field === ConstControlFields.Select ? control.dto.data.split(':')[0] : control.dto.data;
  }
}
