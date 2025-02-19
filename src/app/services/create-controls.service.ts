import { inject, Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ControlDto, Fractal, ControlForm } from '@types';
import { createControlDto, newControlForm } from '@utils';
import { map, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CreateControlsService {
  ds = inject(DataService);
  newControlsFormsMap = new Map<Fractal, FormArray<ControlForm>>();

  newControlsForms(fractal: Fractal): Observable<FormArray<ControlForm> | null> {
    const form = new FormArray<ControlForm>([]);
    this.newControlsFormsMap.set(fractal, form);
    return form.valueChanges.pipe(map(() => (form.value.length > 0 ? form : null)));
  }

  pushNewControlForm(fractal: Fractal): void {
    this.newControlsFormsMap.get(fractal)?.push(newControlForm());
  }

  removeNewControlFormAt(fractal: Fractal, index: number): void {
    this.newControlsFormsMap.get(fractal)?.removeAt(index);
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
