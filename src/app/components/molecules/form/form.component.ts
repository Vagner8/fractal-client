import { Component, Input, output } from '@angular/core';
import { InputComponent, SelectComponent } from '@components/atoms';
import { MatButtonModule, MatInputModule } from '@mat';
import { ControlInputs, Fractal, Indicators } from '@types';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, SelectComponent, InputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() fractal!: Fractal;
  change = output<Fractal>();

  indicators = Indicators;
  controlInputs = ControlInputs;
  controlInputsArray = Object.values(ControlInputs);
}
