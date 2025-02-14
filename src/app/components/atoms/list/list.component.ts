import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { FormArray, FormRecord } from '@angular/forms';
import { Fractal } from '@types';
import { v4 } from 'uuid';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() dataSource: Fractal[] | string[] | FormArray['controls'] = [];
  @Input() templateRef!: TemplateRef<unknown>;

  a!: FormArray<FormRecord>;

  trackFn(): string {
    return v4();
  }
}
