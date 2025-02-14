import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Fractal, NewControlForm } from '@types';
import { ButtonIconComponent, CardComponent, ListComponent } from '@components/atoms';
import { ModifiersService, SelectService } from '@services';
import { ConstEditMods, ConstModifiers } from '@constants';
import { ControlDataFormsComponent, ControlFormComponent } from '@components/molecules';
import { AsyncPipe } from '@angular/common';
import { FormArray } from '@angular/forms';
import { filter, map } from 'rxjs';
import { BaseComponent, newControlForm } from '@utils';

@Component({
  selector: 'app-fractal-form',
  standalone: true,
  imports: [
    CardComponent,
    ButtonIconComponent,
    ControlDataFormsComponent,
    ListComponent,
    ControlFormComponent,
    AsyncPipe,
  ],
  templateUrl: './fractal-form.component.html',
  styleUrl: './fractal-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FractalFormComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() fractal!: Fractal;
  ms = inject(ModifiersService);
  private ss = inject(SelectService);
  editMode = ConstEditMods;
  newControlsForm = new FormArray<NewControlForm>([]);
  newControlsForm$ = this.newControlsForm.valueChanges.pipe(
    map(() => (this.newControlsForm.value.length > 0 ? this.newControlsForm : null))
  );

  ngOnInit(): void {
    this.push(
      this.ms.touch$
        .pipe(filter(modifier => this.ms.$editMode() === ConstEditMods.Controls && modifier === ConstModifiers.New))
        .subscribe(() => this.newControlsForm.push(newControlForm()))
    );
  }

  ngOnDestroy(): void {
    this.clear();
  }

  onDeleteFormCard(fractal: Fractal): void {
    this.ss.$selected.delete(fractal);
    if (this.ss.$selected.isEmpty) {
      this.ms.clear();
      this.newControlsForm.clear();
    }
  }

  onDeleteNewControlForm(index: number): void {
    this.newControlsForm.removeAt(index);
  }
}
