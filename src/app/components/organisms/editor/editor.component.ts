import { Component, inject } from '@angular/core';
import { ControlComponent } from '@components/molecules';
import { StatesService } from '@services';

@Component({
  selector: 'app-editor',
  imports: [ControlComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  ss = inject(StatesService);
}
