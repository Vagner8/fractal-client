import { Component, Input } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { ListComponent } from '@components/atoms';
import { FractalControlsFormsComponent } from '@components/molecules';
import { FractalCollection } from '@types';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FractalControlsFormsComponent, ListComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  @Input() collection!: FractalCollection;
}
