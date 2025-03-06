import { Component, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlInputs } from '@constants';
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
    return this.fractal.parent.order('Order children controls');
  }

  get isNewFractal(): boolean {
    return !this.fractal.parent.fractals.has(this.fractal.cursor);
  }
}
