import { Component, Input, output } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { ButtonIconComponent, CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFormKeys, ConstControlInputs } from '@constants';

@Component({
  selector: 'app-control-forms',
  standalone: true,
  imports: [CardComponent, InputComponent, SelectComponent, ButtonIconComponent],
  templateUrl: './control-forms.component.html',
})
export class ControlFormsComponent {
  @Input() title = '';
  @Input() formRecord!: FormRecord<FormControl>;
  touch = output();
  labels = ConstControlFormKeys.record;
  selectOpts = ConstControlInputs.strings;
}
