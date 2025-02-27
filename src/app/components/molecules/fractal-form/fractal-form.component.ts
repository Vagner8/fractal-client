import { Component, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlInputs } from '@constants';
import { Fractal } from '@types';
import { isCollection } from '@utils';

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
    return this.fractal.controls.get(isCollection(this.fractal) ? 'Cursor' : 'Position')?.get('data');
  }
}
