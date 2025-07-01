import { Component, input } from '@angular/core';
import { ControlDto } from '@types';

@Component({
  selector: 'app-control-form',
  imports: [],
  templateUrl: './control-form.component.html',
  styleUrl: './control-form.component.css',
})
export class ControlFormComponent {
  $control = input<ControlDto | null>();
}
