import { Component, Input } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { ListComponent } from '@components/atoms';
import { Fractal } from '@types';
import { FractalFormComponent } from '@components/molecules';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FractalFormComponent, ListComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  @Input() fractal!: Fractal;
}
