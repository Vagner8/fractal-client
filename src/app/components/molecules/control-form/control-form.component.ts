import { Component, Input, output } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { ButtonIconComponent, CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFormKeys, ConstControlInputs } from '@constants';

@Component({
  selector: 'app-control-form',
  standalone: true,
  imports: [CardComponent, InputComponent, SelectComponent, ButtonIconComponent],
  templateUrl: './control-form.component.html',
})
export class ControlFormComponent {
  @Input() title = '';
  @Input() formRecord!: FormRecord<FormControl>;
  touch = output();
  labels = ConstControlFormKeys.record;
  selectOpts = ConstControlInputs.strings;
}
