import { Component, input } from '@angular/core';
import { CONTROL_MUTABLE } from '@constants';
import { MatTableModule } from '@mat';
import { Control, ControlDto, Fractal } from '@types';

@Component({
  selector: 'app-controls',
  imports: [MatTableModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {
  $fractal = input<Fractal | null>();
  columns = Object.values(CONTROL_MUTABLE);

  tdContent = (control: Control, column: string): string => control[column as keyof ControlDto];
}
