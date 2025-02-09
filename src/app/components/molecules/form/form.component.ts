import { ChangeDetectorRef, Component, inject, Input, OnInit, output } from '@angular/core';
import { InputComponent, SelectComponent } from '@components/atoms';
import { ControlInputs, Indicators } from '@constants';
import { MatButtonModule, MatInputModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, SelectComponent, InputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  cdr = inject(ChangeDetectorRef);
  @Input() fractal!: Fractal;
  change = output<Fractal>();

  prevSize!: number;
  indicators = Indicators;
  controlInputs = ControlInputs;

  ngOnInit(): void {
    this.prevSize = Object.values(this.fractal.form.controls).length;
    this.fractal.form.valueChanges.subscribe(value => {
      const currentSize = Object.values(value).length;
      if (currentSize > this.prevSize) {
        this.prevSize = currentSize;
        this.cdr.detectChanges();
      }
    });
  }
}
