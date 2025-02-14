import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Fractal, NewControlForm } from '@types';
import { ButtonIconComponent, CardComponent, ListComponent } from '@components/atoms';
import { DataService, ModifiersService, SelectService } from '@services';
import { ConstEditMods, ConstModifiers } from '@constants';
import { ControlDataFormsComponent, ControlFormComponent } from '@components/molecules';
import { AsyncPipe } from '@angular/common';
import { FormArray } from '@angular/forms';
import { filter, map } from 'rxjs';
import { addControlsDto, BaseComponent, newControlForm } from '@utils';

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
  private ds = inject(DataService);
  private ss = inject(SelectService);
  editMode = ConstEditMods;
  newControlsForm = new FormArray<NewControlForm>([]);
  newControlsForm$ = this.newControlsForm.valueChanges.pipe(
    map(() => (this.newControlsForm.value.length > 0 ? this.newControlsForm : null))
  );

  ngOnInit(): void {
    this.pushSub(
      this.ms.touch$.pipe(filter(this.touchFilter)).subscribe(() => this.newControlsForm.push(newControlForm()))
    );
    this.pushSub(
      this.ms.hold$
        .pipe(filter(this.holdFilter))
        .subscribe(() => this.ds.addControls(addControlsDto(this.newControlsForm.controls, this.fractal)))
    );
  }

  ngOnDestroy(): void {
    this.clearSubs();
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

  private holdFilter = (modifier: string | null): boolean => {
    return modifier === ConstModifiers.Save && this.newControlsForm.value.length > 0;
  };

  private touchFilter = (modifier: string | null): boolean => {
    return this.ms.$editMode() === ConstEditMods.Controls && modifier === ConstModifiers.New;
  };
}
