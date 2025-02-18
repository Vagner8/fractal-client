import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@mat';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  @Input() opts: string[] = [];
  @Input() label: string = '';
  @Input() formCtr!: FormControl;

  ngOnInit(): void {
    this.formCtr.setValue(this.opts[0]);
  }
}
