import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Card, Input, SelectComponent } from '@atoms';
import { Control, ControlFormGroup, ControlType } from '@types';

@Component({
  selector: 'app-control-form',
  imports: [Card, Input, SelectComponent],
  templateUrl: './control-form.html',
})
export class ControlForm implements OnInit {
  $control = input.required<Control | null>();
  fb = inject(FormBuilder);

  formGroup!: ControlFormGroup;

  controlTypes: ControlType[] = ['text', 'splittable'];

  ngOnInit(): void {
    const control = this.$control();
    if (control) {
      const { data, type, cursor } = control;
      this.formGroup = this.fb.group({
        data,
        type,
        cursor,
      });
    }
  }
}
