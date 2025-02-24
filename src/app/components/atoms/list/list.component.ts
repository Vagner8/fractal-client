import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { Control, Fractal } from '@types';
import { isFractal } from '@utils';

type DataSource = Fractal | Control | string;

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

  isFractal(data: DataSource): data is Fractal {
    return isFractal(data);
  }
}
