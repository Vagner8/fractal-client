import { Component, inject, Input, OnInit } from '@angular/core';
import { CardComponent, ListComponent } from '@components/atoms';
import { ControlDataFormsComponent } from '../control-data-forms/control-data-forms.component';
import { AsyncPipe } from '@angular/common';
import { Fractal, ControlForm } from '@types';
import { ConstEditMods } from '@constants';
import { CreateControlsService, SelectService } from '@services';
import { Observable } from 'rxjs';
import { ControlFormsComponent } from '../control-forms/control-forms.component';
import { FormArray } from '@angular/forms';
import { isClosestMatField } from '@utils';

@Component({
  selector: 'app-fractal-controls-forms',
  standalone: true,
  imports: [CardComponent, ControlDataFormsComponent, ListComponent, ControlFormsComponent, AsyncPipe],
  templateUrl: './fractal-controls-forms.component.html',
  styleUrl: './fractal-controls-forms.component.scss',
})
export class FractalControlsFormsComponent implements OnInit {
  @Input() fractal!: Fractal;

  ss = inject(SelectService);
  ccs = inject(CreateControlsService);

  editMode = ConstEditMods;
  newControlsForms$!: Observable<FormArray<ControlForm> | null>;

  ngOnInit(): void {
    this.newControlsForms$ = this.ccs.newControlsForms(this.fractal);
  }

  onCardClicked({ target }: Event): void {
    if (isClosestMatField(target)) return;
    !this.ss.selectedControlsForms.map.has(this.fractal) && this.ss.selectedControlsForms.set(this.fractal);
    this.ss.selectedControlsForms.map.forEach((state, fractal) => fractal !== this.fractal && state.clear());
    this.ss.selectedFractalForm.set(this.fractal);
  }

  onControlFormClicked({ target }: Event, controlForm: ControlForm): void {
    if (isClosestMatField(target)) return;
    this.ss.selectedControlsForms.map.get(this.fractal)?.toggle(controlForm);
  }
}
