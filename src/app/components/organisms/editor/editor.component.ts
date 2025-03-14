import { Component, inject, Input } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { ListComponent } from '@components/atoms';
import { IFractal } from '@types';
import { FractalFormComponent } from '@components/molecules';
import { StatesService } from '@services';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FractalFormComponent, ListComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  @Input() fractal!: IFractal;
  ss = inject(StatesService);
}
