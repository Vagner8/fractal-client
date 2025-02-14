import { Component, Input } from '@angular/core';
import { InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlInputs, ConstSeparator } from '@constants';
import { Fractal } from '@types';

@Component({
  selector: 'app-control-data-forms',
  standalone: true,
  imports: [SelectComponent, InputComponent],
  templateUrl: './control-data-forms.component.html',
})
export class ControlDataFormsComponent {
  @Input() fractal!: Fractal;
  controlInputs = ConstControlInputs;
  separator = ConstSeparator;
}
