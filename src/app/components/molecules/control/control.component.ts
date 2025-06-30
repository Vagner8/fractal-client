import { Component, input } from '@angular/core';
import { CardComponent, InputComponent } from '@components/atoms';
import { Fractal } from '@types';

@Component({
  selector: 'app-control',
  imports: [CardComponent, InputComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
})
export class ControlComponent {
  $title = input('');
  $fractal = input<Fractal>();
}
