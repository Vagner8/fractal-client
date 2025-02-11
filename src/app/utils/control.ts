// import { FormControl, FormRecord } from '@angular/forms';
// import { ConstControlKeys, ConstSplitIndicators } from '@constants';
// import { ControlDto, Fractal, NewControlFrom } from '@types';
// import { v4 } from 'uuid';

export class ControlFactory {
  // private newControls: ControlDto[] = [];
  // private parentSortControl: ControlDto | null = null;
  // constructor(private formsMap: Map<Fractal, NewControlFrom>) {}
  // clear(): void {
  //   this.newControls = [];
  //   this.parentSortControl = null;
  // }
  // addControls(): {
  //   newControls: ControlDto[];
  //   parentSortControl: ControlDto | null;
  // } {
  //   for (const [fractal, forms] of this.formsMap.entries()) {
  //     forms.controls.forEach(({ value, dirty }) => dirty && this.newControls.push(this.addControl(value, fractal)));
  //   }
  //   return { newControls: this.newControls, parentSortControl: this.parentSortControl };
  // }
  // private addControl(value: FormRecord['value'], fractal: Fractal): ControlDto {
  //   const { dto, form, isItem } = fractal;
  //   const newControl = this.createControl(value, dto.id);
  //   const { data, indicator } = newControl;
  //   if (isItem) this.addToParentSort(indicator, fractal.parent);
  //   dto.controls[indicator] = newControl;
  //   form.addControl(indicator, new FormControl(data));
  //   return newControl;
  // }
  // private createControl(value: FormRecord['value'], parentId: string): ControlDto {
  //   return {
  //     id: v4(),
  //     data: value[ConstControlKeys.data],
  //     input: value[ConstControlKeys.input],
  //     parentId,
  //     indicator: value[ConstControlKeys.indicator],
  //   };
  // }
  // private addToParentSort(indicator: string, parent: Fractal): void {
  //   const parentSortForm = parent.getControlForm(ConstSplitIndicators.Sort);
  //   const parentSortControl = parent.getControl(ConstSplitIndicators.Sort);
  //   const newSortData = `${parentSortControl.data}:${indicator}`;
  //   parentSortForm.setValue(newSortData);
  //   parentSortControl.data = newSortData;
  //   this.parentSortControl = parentSortControl;
  // }
}
