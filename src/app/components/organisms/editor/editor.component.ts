import { Component, inject } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { SelectService } from '@services';
import { ListComponent } from '@components/atoms';
import { FractalControlsFormsComponent } from '@components/molecules';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FractalControlsFormsComponent, ListComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  ss = inject(SelectService);
}
