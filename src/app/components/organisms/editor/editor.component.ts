import { Component, inject, input } from '@angular/core';
import { StatesService } from '@services';

@Component({
  selector: 'app-editor',
  // imports: [CardComponent, ListComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  ss = inject(StatesService);

  Editor = input('');
  Collection = input('');

  get dataSource(): string[] {
    return this.ss.selectedCollection.value?.getArray('Occ') || [];
  }

  formCardClicked(): void {}
}
