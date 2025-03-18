import { Component, inject, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { CardComponent, ListComponent } from '@components/atoms';
import { ConstAppFractals, ConstControlFields } from '@constants';
import { StatesService } from '@services';
import { IFractal } from '@types';
import { DataFieldComponent } from './data-field/data-field.component';
import { AllFieldComponent } from './all-field/all-field.component';

@Component({
  selector: 'app-fractal-form',
  standalone: true,
  imports: [CardComponent, MatRippleModule, DataFieldComponent, AllFieldComponent, ListComponent],
  styleUrl: './fractal-form.component.scss',
  templateUrl: './fractal-form.component.html',
})
export class FractalFormComponent {
  @Input() fractal!: IFractal;
  ss = inject(StatesService);
  ControlInputs = ConstControlFields;

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

  formClicked({ target }: Event): void {
    if (target instanceof HTMLElement) {
      if (target.closest('[data-control-btn]')) return;
    }
    if (!this.ss.selectedControls.isEmpty) {
      this.ss.selectedControls.clear();
    }
    this.ss.selectedForms.toggle(this.fractal);
  }
}
