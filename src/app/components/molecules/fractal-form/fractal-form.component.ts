import { Component, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstAppFractals, ConstControlInputs } from '@constants';
import { IFractal } from '@types';

@Component({
  selector: 'app-fractal-form',
  standalone: true,
  imports: [SelectComponent, InputComponent, CardComponent],
  templateUrl: './fractal-form.component.html',
})
export class FractalFormComponent {
  @Input() fractal!: IFractal;
  ControlInputs = ConstControlInputs;

  get title(): string | undefined {
    return this.fractal.cursor;
  }

  get dataSource(): string[] {
    return this.fractal.parent.isCollection
      ? this.fractal.parent.controls.getAndSplitControlData('Occ')
      : this.fractal.controls.getAndSplitControlData('Ooc');
  }

  get isNewFractal(): boolean {
    return this.fractal.cursor !== ConstAppFractals.App && !this.fractal.parent.fractals.has(this.fractal.cursor);
  }
}
