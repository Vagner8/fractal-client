import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { IFractal } from '@types';
import { AccordionComponent } from './accordion/accordion.component';
import { StatesService } from '@services';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AccordionComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  @Input() fractal!: IFractal;
  ss = inject(StatesService);
}
