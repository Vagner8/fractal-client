import { Component, Input } from '@angular/core';
import { CardComponent, InputComponent, ListComponent, SelectComponent } from '@components/atoms';
import { ConstControlFormKeys, ConstControlInputs } from '@constants';
import { Fractal } from '@types';

@Component({
  selector: 'app-control-all-forms',
  standalone: true,
  imports: [ListComponent, SelectComponent, InputComponent, CardComponent],
  templateUrl: './control-all-forms.component.html',
})
export class ControlAllFormsComponent {
  @Input() fractal!: Fractal;
  controlInputs = ConstControlInputs;
  formKeys = ConstControlFormKeys;
}
