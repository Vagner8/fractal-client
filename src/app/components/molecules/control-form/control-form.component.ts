import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormRecord } from '@angular/forms';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { CONTROL_MUTABLE_FIELDS, CONTROL_TYPES } from '@constants';
import { ConstantsValues, ControlDto } from '@types';

@Component({
  selector: 'app-control-form',
  imports: [CardComponent, InputComponent, SelectComponent],
  templateUrl: './control-form.component.html',
  styleUrl: './control-form.component.css',
})
export class ControlFormComponent implements OnInit {
  $control = input.required<ControlDto>();

  fb = inject(FormBuilder);

  form!: FormRecord;
  mutableFields = CONTROL_MUTABLE_FIELDS;
  controlsTypes = Object.values(CONTROL_TYPES);

  ngOnInit(): void {
    this.form = this.fb.group(this.$control());
    this.form.valueChanges.subscribe(formValue => {
      const control = this.$control();
      Object.entries(formValue).forEach(([key, value]) => {
        control[key as keyof ControlDto] = value;
      });
    });
  }

  getFormControl = (field: ConstantsValues<typeof CONTROL_MUTABLE_FIELDS>): FormControl => {
    return this.form.controls[field] as FormControl;
  };
}
