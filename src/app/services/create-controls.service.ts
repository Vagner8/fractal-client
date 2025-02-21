import { inject, Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ControlDto, Fractal, ControlForm } from '@types';
import { createControlDto, newControlForm } from '@utils';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CreateControlsService {
  ds = inject(DataService);
  newControlsFormsMap = new Map<Fractal, FormArray<ControlForm>>();
  changes$ = new BehaviorSubject<Map<Fractal, FormArray<ControlForm>>>(this.newControlsFormsMap);

  pushNewControlForm(fractal: Fractal): void {
    const controlForm = newControlForm();
    let formArray = this.newControlsFormsMap.get(fractal);
    if (!formArray) {
      formArray = new FormArray<ControlForm>([controlForm]);
      this.newControlsFormsMap.set(fractal, formArray);
    } else {
      formArray.push(controlForm);
    }
    this.changes$.next(this.newControlsFormsMap);
  }

  removeNewControlFormAt(fractal: Fractal, index: number): void {
    this.newControlsFormsMap.get(fractal)?.removeAt(index);
    this.changes$.next(this.newControlsFormsMap);
  }

  addNewControlsFormsToFractalAndSave(): void {
    for (const [fractal, form] of this.newControlsFormsMap) {
      this.ds.addControls(this.addNewControlsDtoToFractal(fractal, form)).subscribe();
    }
  }

  private addNewControlsDtoToFractal(fractal: Fractal, form: FormArray<ControlForm>): ControlDto[] {
    return form.controls.map(controlForm => {
      const controlDto = createControlDto(controlForm, fractal.dto.id);
      fractal.dto.controls[controlDto.indicator] = controlDto;
      fractal.form.addControl(controlDto.indicator, controlForm);
      form.clear();
      return controlDto;
    });
  }
}
