import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonIconComponent, CardComponent, ListComponent } from '@components/atoms';
import { ControlDataFormsComponent } from '../control-data-forms/control-data-forms.component';
import { AsyncPipe } from '@angular/common';
import { Fractal, NewControlForm } from '@types';
import { ConstEditMods, ConstModifiers } from '@constants';
import { BaseComponent } from '@utils';
import { CreateControlsService, SelectService } from '@services';
import { filter, Observable } from 'rxjs';
import { ControlFormsComponent } from '../control-forms/control-forms.component';
import { FormArray } from '@angular/forms';

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
  @Input() selected = false;

  ss = inject(SelectService);
  private ccs = inject(CreateControlsService);

  editMode = ConstEditMods;
  newControls$!: Observable<FormArray<NewControlForm> | null>;

  ngOnInit(): void {
    this.newControls$ = this.ccs.newControls(this.fractal);
    const { New, Save } = ConstModifiers.record;
    const { Controls } = ConstEditMods;

    this.pushSub(
      this.ss.modifiers.touch$.pipe(filter(Boolean)).subscribe(modifier => {
        ({
          [New]: (): void => {
            if (this.ss.modifiers.$editMode() === Controls) {
              this.ccs.addNewControl(this.fractal);
            }
          },
        })[modifier]?.();
      })
    );

    this.pushSub(
      this.ss.modifiers.hold$.pipe(filter(Boolean)).subscribe(modifier => {
        ({
          [Save]: (): void => {
            this.ccs.addControlsToFractalAndSave(this.fractal);
          },
        })[modifier]?.();
      })
    );
  }

  ngOnDestroy(): void {
    this.clearSubs();
  }

  onDeleteFormCard(fractal: Fractal): void {
    this.ss.selectedFractals.delete(fractal);
    if (this.ss.selectedFractals.isEmpty) {
      this.ss.modifiers.clear();
      this.ccs.newControlsMap.clear();
    }
  }

  onDeleteNewControlForm(index: number): void {
    this.ccs.removeControlFormAt(this.fractal, index);
  }
}
