import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent, SelectComponent } from '@components/atoms';
import { ControlInputs, ControlKeys } from '@types';

@Component({
  selector: 'app-new-control',
  standalone: true,
  imports: [SelectComponent, InputComponent],
  templateUrl: './new-control.component.html',
})
export class NewControlComponent implements OnInit {
  labels = [ControlKeys.indicator, ControlKeys.input, ControlKeys.data];
  formGroup!: FormGroup<{ [key: string]: FormControl }>;
  controlInputs = Object.values(ControlInputs);

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
  }

  private createFormGroup(): FormGroup {
    return new FormGroup(
      this.labels.reduce((acc: Record<string, FormControl>, label) => {
        acc[label] = new FormControl('');
        return acc;
      }, {})
    );
  }
}
