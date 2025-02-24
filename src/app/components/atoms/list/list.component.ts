import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { Control, Fractal } from '@types';

type DataSource = Fractal | string | Control;

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() dataSource: DataSource[] = [];
  @Input() templateRef!: TemplateRef<unknown>;

  trackFn(data: DataSource): string {
    return typeof data === 'string' ? data : data.dto.id;
  }
}
