import { Component, inject } from '@angular/core';
import { StatesService } from '@services';

@Component({
  selector: 'app-editor',
  // imports: [CardComponent, ListComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  ss = inject(StatesService);

  get dataSource(): string[] {
    return this.ss.selectedFractal.value?.getArray('Occ') || [];
  }

  formCardClicked(): void {}
}
