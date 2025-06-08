import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { IFractal, TableView } from '@types';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, TapDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  $view = input<TableView>('children');
  $fractal = input<IFractal>();
}
