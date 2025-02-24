import { Component, Input } from '@angular/core';
import { MatTableModule } from '@mat';
import { Control, Fractal } from '@types';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {
  @Input() fractal!: Fractal;
  @Input() customColumns?: string[];

  get columns(): string[] {
    return this.customColumns ? this.customColumns : [];
  }

  get dataSource(): Control[] {
    return Object.values(this.fractal.controls);
  }
}
