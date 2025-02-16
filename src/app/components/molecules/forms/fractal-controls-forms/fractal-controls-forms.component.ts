import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonIconComponent, CardComponent, ListComponent } from '@components/atoms';
import { ControlDataFormsComponent } from '../control-data-forms/control-data-forms.component';
import { AsyncPipe } from '@angular/common';
import { Fractal, NewControlForm } from '@types';
import { ConstEditMods, ConstModifiers } from '@constants';
import { addControlsDto, BaseComponent, newControlForm } from '@utils';
import { DataService, ModifiersService, SelectService } from '@services';
import { FormArray } from '@angular/forms';
import { filter, map } from 'rxjs';
import { ControlFormsComponent } from '../control-forms/control-forms.component';

@Component({
  selector: 'app-fractal-controls-forms',
  standalone: true,
  imports: [
    CardComponent,
    ButtonIconComponent,
    ControlDataFormsComponent,
    ListComponent,
    ControlFormsComponent,
    AsyncPipe,
  ],
  templateUrl: './fractal-controls-forms.component.html',
  styleUrl: './fractal-controls-forms.component.scss',
})
export class FractalControlsFormsComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() fractal!: Fractal;
  ms = inject(ModifiersService);
  private ds = inject(DataService);
  private ss = inject(SelectService);
  editMode = ConstEditMods;
  newControlsForm = new FormArray<NewControlForm>([]);
  newControlsForm$ = this.newControlsForm.valueChanges.pipe(
    map(() => (this.newControlsForm.value.length > 0 ? this.newControlsForm : null))
  );

  ngOnInit(): void {
    const { New, Save } = ConstModifiers.record;
    const { Controls } = ConstEditMods;
    this.pushSub(
      this.ms.touch$.pipe(filter(Boolean)).subscribe(modifier => {
        ({
          [New]: (): void => {
            if (this.ms.$editMode() !== Controls) return;
            this.newControlsForm.push(newControlForm());
          },
        })[modifier]?.();
      })
    );
    this.pushSub(
      this.ms.hold$.pipe(filter(Boolean)).subscribe(modifier => {
        ({
          [Save]: (): void => {
            if (this.newControlsForm.value.length === 0) return;
            this.ds.addControls(addControlsDto(this.newControlsForm.controls, this.fractal));
          },
        })[modifier]?.();
      })
    );
  }

  ngOnDestroy(): void {
    this.clearSubs();
  }

  onDeleteFormCard(fractal: Fractal): void {
    this.ss.$selectedFractals.delete(fractal);
    if (this.ss.$selectedFractals.isEmpty) {
      this.ms.clear();
      this.newControlsForm.clear();
    }
  }

  onDeleteNewControlForm(index: number): void {
    this.newControlsForm.removeAt(index);
  }
}
