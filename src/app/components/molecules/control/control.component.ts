import { Component, inject, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFields, ConstControlMutable } from '@constants';
import { StatesService } from '@services';
import { IControl } from '@types';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [CardComponent, InputComponent, SelectComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
})
export class ControlComponent {
  @Input() control!: IControl;
  @Input() fullEditMode = false;
  ss = inject(StatesService);
  ControlFields = ConstControlFields;
  ControlMutable = ConstControlMutable;
  ControlFieldsValues = Object.values(ConstControlFields);

  controlClicked(): void {
    this.ss.selectedForm.clear();
    this.ss.selectedControls.toggle(this.control);
  }
}
