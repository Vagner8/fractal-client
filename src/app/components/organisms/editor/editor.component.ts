import { Component, inject } from '@angular/core';
import { FormFractalComponent } from '@components/molecules';
import { WORDS } from '@constants';
import { StatesService } from '@services';

@Component({
  selector: 'app-editor',
  imports: [FormFractalComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  ss = inject(StatesService);

  words = WORDS;
}
