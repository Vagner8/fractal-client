import { Component, inject, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFields, ConstControlMutable } from '@constants';
import { StatesService } from '@services';
import { IControl } from '@types';

@Component({
  selector: 'app-all-field',
  standalone: true,
  imports: [CardComponent, SelectComponent, InputComponent],
  styleUrl: './all-field.component.scss',
  templateUrl: './all-field.component.html',
})
export class AllFieldComponent {
  @Input() control!: IControl;
  ss = inject(StatesService);
  opts = Object.values(ConstControlFields);
  ControlMutable = ConstControlMutable;

  controlClicked(): void {
    if (!this.ss.selectedForm.isEmpty) {
      this.ss.selectedForm.clear();
    }
    this.ss.selectedControls.toggle(this.control);
  }
}
