import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Card, Input, SelectComponent } from '@atoms';
import { FractalService } from '@services';
import { Control, ControlFormGroup, ControlType } from '@types';

@Component({
  selector: 'app-control-form',
  imports: [Card, Input, SelectComponent],
  templateUrl: './control-form.html',
})
export class ControlForm implements OnInit, OnDestroy {
  $control = input.required<Control | null>();
  $isFullEditMode = input(false);

  id = '';
  fb = inject(FormBuilder);
  fs = inject(FractalService);

  formGroup!: ControlFormGroup;
  controlTypes: ControlType[] = ['text', 'splittable'];

  ngOnInit(): void {
    const control = this.$control();

    if (control) {
      const { id, data, type, cursor } = control;
      this.id = id;
      this.formGroup = this.fb.group({
        data,
        type,
        cursor,
      });

      this.fs.controlsForms.addControl(id, this.formGroup);
    }
  }

  ngOnDestroy(): void {
    this.fs.controlsForms.removeControl(this.id);
  }
}
