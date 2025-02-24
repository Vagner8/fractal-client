import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFormKeys, ConstControlInputs } from '@constants';
import { ControlForm } from '@types';

@Component({
  selector: 'app-control-forms',
  standalone: true,
  imports: [CardComponent, InputComponent, SelectComponent, NgStyle],
  templateUrl: './control-forms.component.html',
})
export class ControlFormsComponent {
  @Input() title = '';
  @Input() selected = false;
  @Input() controlForm!: ControlForm;
  labels = ConstControlFormKeys.record;
  selectOpts = ConstControlInputs.strings;
}
