import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { Control, Fractal } from '@types';
import { v4 } from 'uuid';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() dataSource: Fractal[] | string[] | Control[] = [];
  @Input() templateRef!: TemplateRef<unknown>;

  trackFn(): string {
    return v4();
  }
}
