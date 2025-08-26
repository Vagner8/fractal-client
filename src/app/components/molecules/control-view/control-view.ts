import { Component, computed, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Card, Input, Select } from '@atoms';
import { StatesService } from '@services';
import { Control, ControlDto, ControlDtoMutable, ControlType, FractalFields } from '@types';

@Component({
  selector: 'app-control-view',
  imports: [Card, Input, Select],
  templateUrl: './control-view.html',
  styleUrl: './control-view.scss',
})
export class ControlView implements OnInit, OnDestroy {
  $cursor = input.required<string>();
  $column = input.required<string>();
  $fractalField = input.required<FractalFields>();

  fb = inject(FormBuilder);
  ss = inject(StatesService);

  control: Control | null | undefined;
  controlTypes: ControlType[] = ['text', 'splittable'];

  ngOnInit(): void {
    this.control = this.getControl();
  }

  $isChildControl = computed(() => this.$fractalField() === 'children');

  $isEditMode = computed<boolean>(() =>
    this.ss.collectionStates[this.$fractalField()].$$has(
      this.$isChildControl() ? this.control?.parent : this.control,
    )(),
  );

  $isFullEditMode = computed<boolean>(() => false);

  getControl(): Control | null | undefined {
    const column = this.$column();
    const cursor = this.$cursor();
    const selectedFractal = this.ss.selectedFractal.$value();

    switch (this.$fractalField()) {
      case 'children':
        return selectedFractal?.findChild([cursor])?.findControl([column]);
      case 'controls':
        return selectedFractal?.findControl([cursor]);
      case 'childrenControls':
        return selectedFractal?.findChildrenControl(cursor);
    }
  }

  get dataView(): string | null | undefined {
    const column = this.$column();
    const cursor = this.$cursor();
    switch (this.$fractalField()) {
      case 'children':
        return column === 'cursor' ? cursor : this.control?.data;
      case 'controls':
      case 'childrenControls':
        return this.control?.[column as keyof ControlDto];
      default:
        return '';
    }
  }

  get formControl(): FormControl | null {
    if (this.control) {
      const column = this.$column();
      const { id, data, type, cursor } = this.control;
      const form = this.fb.group({
        data,
        type,
        cursor,
      });
      this.ss.controlsForms.addControl(id, form);
      return this.$isChildControl() ? form.controls.data : form.controls[column as keyof ControlDtoMutable];
    }
    return null;
  }

  ngOnDestroy(): void {
    if (this.control?.id) {
      this.ss.controlsForms.removeControl(this.control.id);
    }
  }
}
