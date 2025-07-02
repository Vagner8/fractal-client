import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { CONTROL_MUTABLE_FIELDS, CONTROL_TYPES } from '@constants';
import { Control, ControlDtoMutable } from '@types';

@Component({
  selector: 'app-control-form',
  imports: [CardComponent, InputComponent, SelectComponent],
  templateUrl: './control-form.component.html',
  styleUrl: './control-form.component.css',
})
export class ControlFormComponent implements OnInit, OnDestroy {
  $control = input.required<Control>();
  control!: Control;

  fb = inject(FormBuilder);

  mutableFields = CONTROL_MUTABLE_FIELDS;
  controlsTypes = Object.values(CONTROL_TYPES);

  ngOnInit(): void {
    this.control = this.$control();
    this.control.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.control.form = undefined;
  }

  createForm = (): FormGroup =>
    this.fb.group(Object.fromEntries(Object.values(CONTROL_MUTABLE_FIELDS).map(key => [key, this.control[key]])));

  getFromControl = (field: keyof ControlDtoMutable, form: FormGroup): FormControl => form.get(field) as FormControl;
}
