import { Component, inject, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ConstAppFractals, ConstControlInputs } from '@constants';
import { FractalService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-fractal-form',
  standalone: true,
  imports: [SelectComponent, InputComponent, CardComponent, MatRippleModule],
  styleUrl: './fractal-form.component.scss',
  templateUrl: './fractal-form.component.html',
})
export class FractalFormComponent {
  @Input() fractal!: IFractal;
  fs = inject(FractalService);
  ControlInputs = ConstControlInputs;

  get title(): string | undefined {
    return this.fractal.cursor;
  }

  get dataSource(): string[] {
    return this.fractal.parent.isCollection
      ? this.fractal.parent.controls.getAndSplitControlData('Occ')
      : this.fractal.controls.getAndSplitControlData('Ooc');
  }

  get isNewFractal(): boolean {
    return this.fractal.cursor !== ConstAppFractals.App && !this.fractal.parent.fractals.has(this.fractal.cursor);
  }
}
