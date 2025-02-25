import { Component, Input } from '@angular/core';
import { InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlInputs, ConstControlMutableKeys, ConstSeparator } from '@constants';
import { Fractal } from '@types';

@Component({
  selector: 'app-fractal-form',
  standalone: true,
  imports: [SelectComponent, InputComponent],
  templateUrl: './fractal-form.component.html',
})
export class FractalFormComponent {
  @Input() fractal!: Fractal;
  Separator = ConstSeparator;
  ControlInputs = ConstControlInputs;
  ControlFormKeys = ConstControlMutableKeys;
}
