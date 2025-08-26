import { Component, computed, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Card, Input, SelectComponent } from '@atoms';
import { StatesService } from '@services';
import { Control, ControlDtoMutable, ControlFormGroup, ControlType } from '@types';

@Component({
  selector: 'app-control-form',
  imports: [Card, Input, SelectComponent],
  templateUrl: './control-form.html',
})
export class ControlForm implements OnInit, OnDestroy {
  $label = input.required<string>();
  $control = input<Control | null>();
  $isChildControl = input(false);
  $isFullEditMode = input(false);

  fb = inject(FormBuilder);
  ss = inject(StatesService);

  $form = computed<FormControl>(
    () => this.formGroup.controls[this.$isChildControl() ? 'data' : (this.$label() as keyof ControlDtoMutable)],
  );

  id = '';
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

      this.ss.controlsForms.addControl(id, this.formGroup);
    }
  }

  ngOnDestroy(): void {
    this.ss.controlsForms.removeControl(this.id);
  }
}
