import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule } from '@mat';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIcon],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {
  $form = input<FormControl>();
  $label = input('');

  errors = (form: FormControl): string[] => (form.errors ? Object.values(form.errors) : []);
}
