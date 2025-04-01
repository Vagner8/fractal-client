import { Component, inject, Input } from '@angular/core';
import { CardComponent, ListComponent } from '@components/atoms';
import { IFractal } from '@types';
import { StatesService } from '@services';
import { ControlComponent } from '@components/molecules';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CardComponent, ControlComponent, ListComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  @Input() fractal!: IFractal;
  ss = inject(StatesService);

  get dataSource(): string[] {
    return this.fractal.controls.getAndSplitControlData(this.fractal.isCollection ? 'Occ' : 'Ooc');
  }

  formCardClicked(fractal: IFractal): void {
    this.ss.selectedForm.toggle(fractal);
    this.ss.selectedControls.clear();
  }
}
