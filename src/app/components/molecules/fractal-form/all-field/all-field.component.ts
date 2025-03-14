import { Component, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlFields, ConstControlMutable } from '@constants';
import { IControl } from '@types';

@Component({
  selector: 'app-all-field',
  standalone: true,
  imports: [CardComponent, SelectComponent, InputComponent],
  templateUrl: './all-field.component.html',
})
export class AllFieldComponent {
  @Input() control!: IControl;
  opts = Object.values(ConstControlFields);
  ControlMutable = ConstControlMutable;
}
