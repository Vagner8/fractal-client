import { Component, inject, Input, OnInit } from '@angular/core';
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
export class AllFieldComponent implements OnInit {
  @Input() control!: IControl;
  ss = inject(StatesService);
  opts = Object.values(ConstControlFields);
  ControlMutable = ConstControlMutable;

  ngOnInit(): void {
    if (this.control.getFromControl('field').value === ConstControlFields.Select) {
      this.control.getFromControl('data').setValue(this.control.dto.data);
    }
  }

  controlClicked(): void {
    this.ss.selectedForm.clear();
    this.ss.selectedControls.toggle(this.control);
  }
}
