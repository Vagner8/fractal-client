import { Component, Input } from '@angular/core';
import { InputComponent, SelectComponent } from '@components/atoms';
import { ConstControlInputs } from '@constants';
import { Fractal } from '@types';

@Component({
  selector: 'app-control-data-forms',
  standalone: true,
  imports: [SelectComponent, InputComponent],
  templateUrl: './control-data-forms.component.html',
})
export class ControlDataFormsComponent {
  @Input() fractal!: Fractal;
  controlInputs = ConstControlInputs;

  ngOnInit(): void {
    console.log('🚀 ~ fractal:', this.fractal);
    console.log('🚀 ~ sort:', this.fractal.sort);
  }
}
