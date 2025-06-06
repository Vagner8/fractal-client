import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input() opts: string[] = [];
  @Input() label: string = '';
  @Input() form!: FormControl;
}
