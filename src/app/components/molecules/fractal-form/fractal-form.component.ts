import { Component, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlInputs, ConstIndicators } from '@constants';
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
    const occ = this.fractal.parent.controls.getAndSplitControlData('Occ');
    return occ.length > 0 ? occ : [ConstIndicators.Cursor];
  }

  get isNewFractal(): boolean {
    return !this.fractal.parent.fractals.has(this.fractal.cursor);
  }
}
