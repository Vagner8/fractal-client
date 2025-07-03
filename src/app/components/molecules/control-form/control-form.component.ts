import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { CONTROL_MUTABLE, CONTROL_TYPES } from '@constants';
import { StatesService } from '@services';
import { Control, ControlDtoMutable } from '@types';
import { take } from 'rxjs';

@Component({
  selector: 'app-control-form',
  imports: [CardComponent, InputComponent, SelectComponent],
  templateUrl: './control-form.component.html',
})
export class ControlFormComponent implements OnInit, OnDestroy {
  $control = input.required<Control>();
  control!: Control;

  fb = inject(FormBuilder);
  ss = inject(StatesService);

  mutableFields = CONTROL_MUTABLE;
  controlsTypes = Object.values(CONTROL_TYPES);

  ngOnInit(): void {
    this.control = this.$control();
    this.control.form = this.createForm();
    this.control.form.valueChanges.pipe(take(1)).subscribe(() => {
      this.ss.controlToUpdate.push(this.control);
    });
  }

  ngOnDestroy(): void {
    this.control.form = null;
  }

  createForm = (): FormGroup =>
    this.fb.group(Object.fromEntries(Object.values(CONTROL_MUTABLE).map(key => [key, this.control[key]])));

  getFromControl = (field: keyof ControlDtoMutable, form: FormGroup): FormControl => form.get(field) as FormControl;
}
