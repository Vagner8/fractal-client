import { Component, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlInputs } from '@constants';
import { Fractal } from '@types';

@Component({
  selector: 'app-fractal-form',
  standalone: true,
  imports: [SelectComponent, InputComponent, CardComponent],
  templateUrl: './fractal-form.component.html',
})
export class FractalFormComponent {
  @Input() fractal!: Fractal;
  ControlInputs = ConstControlInputs;

  get title(): string | undefined {
    return this.fractal.controls.get(this.fractal.fractals.values.length > 0 ? 'Cursor' : 'Position')?.get('data');
  }

  get dataSource(): string[] {
    const sort = this.fractal.parent.controls.get('Sort children controls');
    return sort ? sort.getDataAndSplit() : this.fractal.parent.default.sortChildrenControls;
  }

  get isNewFractal(): boolean {
    return !this.fractal.parent.fractals.values.includes(this.fractal);
  }
}
