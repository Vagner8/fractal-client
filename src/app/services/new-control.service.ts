import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NewControlKeys } from '@constants';
import { Fractal, NewControlFrom } from '@types';

@Injectable({
  providedIn: 'root',
})
export class NewControlService {
  fb = inject(FormBuilder);
  forms = new Map<Fractal, NewControlFrom>();

  has(fractal: Fractal): boolean {
    return this.forms.has(fractal);
  }

  push(fractal: Fractal): void {
    const formArray = this.forms.get(fractal);
    if (formArray) {
      formArray.push(this.createFormGroup());
    } else {
      this.forms.set(fractal, new FormArray([this.createFormGroup()]));
    }
  }

  copy(fractal: Fractal, index: number): void {
    const form = this.forms.get(fractal);
    form?.push(this.fb.group(form.controls[index].value));
  }

  removeAt(fractal: Fractal, index: number): void {
    const from = this.forms.get(fractal);
    from?.removeAt(index);
  }

  private createFormGroup(): FormGroup {
    return new FormGroup(
      NewControlKeys.values.reduce((acc: Record<string, FormControl>, label) => {
        acc[label] = new FormControl('');
        return acc;
      }, {})
    );
  }
}
