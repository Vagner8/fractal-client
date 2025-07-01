import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@mat';

@Component({
  selector: 'app-select',
  imports: [MatSelectModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  $form = input<FormControl>();
  $opts = input<string[]>([]);
  $label = input('');
}
