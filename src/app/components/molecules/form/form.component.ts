import { Component, Input, output } from '@angular/core';
import { InputComponent, SelectComponent } from '@components/atoms';
import { ControlInputs } from '@constants';
import { MatButtonModule, MatInputModule } from '@mat';
import { Fractal, Indicators } from '@types';

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

  ngOnInit(): void {
    this.fractal.form.valueChanges.subscribe(value => {
      console.log('🚀 ~ value:', value);
    });
  }

  indicators = Indicators;
  controlInputs = ControlInputs;
}
