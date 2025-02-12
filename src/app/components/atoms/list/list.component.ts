import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { Fractal } from '@types';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() dataSource: Fractal[] | string[] = [];
  @Input() templateRef!: TemplateRef<unknown>;

  trackFn(data: Fractal | string): string {
    return typeof data === 'string' ? data : data.cursor;
  }
}
