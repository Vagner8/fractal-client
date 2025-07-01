import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormRecord } from '@angular/forms';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { CONTROL_MUTABLE_FIELDS, CONTROL_TYPES } from '@constants';
import { StatesService } from '@services';
import { ConstantsValues, Fractal } from '@types';

@Component({
  selector: 'app-form-fractal',
  imports: [CardComponent, InputComponent, SelectComponent],
  templateUrl: './form-fractal.component.html',
  styleUrl: './form-fractal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFractalComponent implements OnInit {
  $title = input<number | string>('');
  $fractal = input.required<Fractal>();

  fb = inject(FormBuilder);
  ss = inject(StatesService);

  fractalForm!: FormRecord<FormGroup>;
  mutableFields = CONTROL_MUTABLE_FIELDS;
  controlsTypes = Object.values(CONTROL_TYPES);

  ngOnInit(): void {
    this.fractalForm = this.createFormRecord(this.$fractal());
    this.fractalForm.valueChanges.subscribe(value => {
      console.log('🚀 ~ value:', value);
    });
  }

  getFieldForm(indicator: string, field: ConstantsValues<typeof CONTROL_MUTABLE_FIELDS>): FormControl {
    return this.fractalForm.controls[indicator].controls[field] as FormControl;
  }

  createFormRecord(fractal: Fractal): FormRecord<FormRecord> {
    const form = new FormRecord<FormRecord>({});
    for (const indicator in fractal.controls) {
      form.setControl(indicator, this.fb.record(Object.fromEntries(Object.entries(fractal.controls[indicator]))));
    }
    return form;
  }
}
