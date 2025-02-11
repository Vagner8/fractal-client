import { Component, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { Fractal } from '@types';

@Component({
  selector: 'app-control-cards',
  standalone: true,
  imports: [CardComponent, InputComponent, SelectComponent],
  templateUrl: './control-cards.component.html',
})
export class ControlFormComponent {
  @Input() fractal!: Fractal;
}
