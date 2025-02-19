import { Component, Input, output } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFormKeys, ConstControlInputs } from '@constants';
import { ControlForm } from '@types';

@Component({
  selector: 'app-control-forms',
  standalone: true,
  imports: [CardComponent, InputComponent, SelectComponent],
  templateUrl: './control-forms.component.html',
})
export class ControlFormsComponent {
  @Input() title = '';
  @Input() selected = false;
  @Input() formRecord!: ControlForm;
  touch = output();
  labels = ConstControlFormKeys.record;
  selectOpts = ConstControlInputs.strings;
}
