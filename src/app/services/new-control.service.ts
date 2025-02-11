import { Injectable } from '@angular/core';
// import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { NewControlKeys } from '@constants';
// import { Fractal, NewControlFrom } from '@types';
// import { ControlFactory } from '@utils';
// import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class NewControlService {
  // fb = inject(FormBuilder);
  // ds = inject(DataService);
  // forms = new Map<Fractal, NewControlFrom>();
  // has(fractal: Fractal): boolean {
  //   return this.forms.has(fractal);
  // }
  // push(fractal: Fractal): void {
  //   const formArray = this.forms.get(fractal);
  //   if (formArray) {
  //     formArray.push(this.createFormGroup());
  //   } else {
  //     this.forms.set(fractal, new FormArray([this.createFormGroup()]));
  //   }
  // }
  // copy(fractal: Fractal, index: number): void {
  //   const form = this.forms.get(fractal);
  //   form?.push(this.fb.group(form.controls[index].value));
  // }
  // removeAt(fractal: Fractal, index: number): void {
  //   const from = this.forms.get(fractal);
  //   from?.removeAt(index);
  // }
  // createControls(): void {
  //   const factory = new ControlFactory(this.forms);
  //   const { newControls, parentSortControl } = factory.addControls();
  //   newControls.length > 0 && this.ds.addControls(newControls).subscribe();
  //   parentSortControl && this.ds.updateControls([parentSortControl]).subscribe();
  //   factory.clear();
  //   this.forms.clear();
  // }
  // private createFormGroup(): FormGroup {
  //   return new FormGroup(
  //     NewControlKeys.values.reduce((acc: Record<string, FormControl>, label) => {
  //       acc[label] = new FormControl('');
  //       return acc;
  //     }, {})
  //   );
  // }
}
