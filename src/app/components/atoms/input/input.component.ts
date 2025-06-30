import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule } from '@mat';
import { ControlDto } from '@types';

@Component({
  selector: 'app-input',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon, NgFor],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  $control = input<ControlDto | null>(null);

  errors = (form: FormControl): string[] => (form.errors ? Object.values(form.errors) : []);
  crateForm = (data: string): FormControl => new FormControl(data);
}
