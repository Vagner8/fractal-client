import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ControlInputs, NewControlKeys } from '@constants';
import { NewControlMenuComponent } from './new-control-menu/new-control-menu.component';

@Component({
  selector: 'app-new-control',
  standalone: true,
  imports: [SelectComponent, InputComponent, CardComponent, NewControlMenuComponent],
  templateUrl: './new-control.component.html',
})
export class NewControlComponent {
  @Input() formArray!: FormArray<FormGroup<Record<string, FormControl>>>;

  controlInputs = ControlInputs;
  newControlKeys = NewControlKeys;
}
