import { Component, inject } from '@angular/core';
import { CardComponent, ListComponent } from '@components/atoms';
import { IFractal } from '@types';
import { StatesService } from '@services';
import { ControlComponent } from '@components/molecules';

@Component({
  selector: 'app-editor',
  imports: [CardComponent, ControlComponent, ListComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  ss = inject(StatesService);

  get dataSource(): string[] {
    return this.ss.selectedFractal.value?.controls.getOneSplitable('Occ') || [];
  }

  formCardClicked(fractal: IFractal): void {}
}
