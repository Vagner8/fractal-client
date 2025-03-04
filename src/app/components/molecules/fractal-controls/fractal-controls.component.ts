import { Component, Input } from '@angular/core';
import { MatTableModule } from '@mat';
import { ControlMutableDto, Fractal } from '@types';

@Component({
  selector: 'app-fractal-controls',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './fractal-controls.component.html',
  styleUrl: './fractal-controls.component.scss',
})
export class FractalControlsComponent {
  @Input() fractal!: Fractal;

  get columns(): (keyof ControlMutableDto)[] {
    return ['indicator', 'data', 'input'];
  }

  get dataSource(): string[] {
    return this.fractal.order('Order own controls');
  }
}
