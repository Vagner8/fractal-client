import { Component, Input } from '@angular/core';
import { CardComponent, ListComponent } from '@components/atoms';
import { ControlDataFormsComponent } from '../control-data-forms/control-data-forms.component';
import { ControlFormsComponent } from '../control-forms/control-forms.component';
import { Fractal } from '@types';

@Component({
  selector: 'app-fractal-controls-forms',
  standalone: true,
  imports: [CardComponent, ControlDataFormsComponent, ListComponent, ControlFormsComponent],
  templateUrl: './fractal-controls-forms.component.html',
  styleUrl: './fractal-controls-forms.component.scss',
})
export class FractalControlsFormsComponent {
  @Input() fractal!: Fractal;

  // ss = inject(SelectService);
  // ccs = inject(CreateControlsService);

  // EditMode = ConstEditMods;
  // newControlsForms$!: Observable<FormArray<ControlForm> | undefined>;

  // ngOnInit(): void {
  //   this.newControlsForms$ = this.ccs.changes$.pipe(map(map => map.get(this.fractal)));
  // }

  onFractalFormClicked(): void {
    // if (this.ss.selectFractalFrom.has(this.fractal)) return;
    // this.ss.selectedControls.clear();
    // this.ss.selectFractalFrom.set(this.fractal);
  }

  // onControlFormClicked(control: Control): void {
  //   control.$selected.update(prev => !prev);
  // }
}
