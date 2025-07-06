import { Component, inject } from '@angular/core';
import { CardComponent, OrderedControlsComponent } from '@components/atoms';
import { ControlFormComponent } from '@components/molecules';
import { WORDS } from '@constants';
import { StatesService } from '@services';

@Component({
  selector: 'app-editor',
  imports: [CardComponent, ControlFormComponent, OrderedControlsComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  ss = inject(StatesService);
  words = WORDS;
}
