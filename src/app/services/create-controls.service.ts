import { inject, Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Fractal, NewControlForm } from '@types';
import { addControlsDto, newControlForm } from '@utils';
import { map, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CreateControlsService {
  ds = inject(DataService);
  newControlsMap = new Map<Fractal, FormArray<NewControlForm>>();

  newControls(fractal: Fractal): Observable<FormArray<NewControlForm> | null> {
    const form = new FormArray<NewControlForm>([]);
    this.newControlsMap.set(fractal, form);
    return form.valueChanges.pipe(map(() => (form.value.length > 0 ? form : null)));
  }

  getForms(fractal: Fractal): FormArray<NewControlForm> | undefined {
    return this.newControlsMap.get(fractal);
  }

  addNewControl(fractal: Fractal): void {
    this.newControlsMap.get(fractal)?.push(newControlForm());
  }

  removeControlFormAt(fractal: Fractal, index: number): void {
    this.newControlsMap.get(fractal)?.removeAt(index);
  }

  addControlsToFractalAndSave(fractal: Fractal): void {
    const newControls = this.newControlsMap.get(fractal);
    if (!newControls || newControls.length === 0) return;
    this.ds.addControls(addControlsDto(newControls.controls, fractal));
  }
}
