import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFields } from '@constants';
import { IFractal } from '@types';

@Component({
  selector: 'app-data-field',
  standalone: true,
  imports: [SelectComponent, InputComponent],
  templateUrl: './data-field.component.html',
})
export class DataFieldComponent implements OnInit {
  @Input() field!: string;
  @Input() fractal!: IFractal;
  @Input() dataForm!: FormControl;
  @Input() indicator!: string;
  ControlInputs = ConstControlFields;

  ngOnInit(): void {
    if (this.field === ConstControlFields.Select) {
      this.dataForm.setValue(this.dataForm.value.split(':')[0]);
    }
  }
}
