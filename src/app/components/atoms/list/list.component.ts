import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { IControl, IFractal } from '@types';
import { isFractal } from '@utils';

type DataSource = IFractal | IControl | string;

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() dataSource: DataSource[] = [];
  @Input() templateRef!: TemplateRef<unknown>;
  @Input() threeColumns = true;

  trackFn(data: DataSource): string {
    return typeof data === 'string' ? data : data.dto.id;
  }

  isFractal(data: DataSource): data is IFractal {
    return isFractal(data);
  }
}
