import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StatesService } from '@services';
import { AccordionComponent } from './accordion/accordion.component';
@Component({
  selector: 'app-admin',
  imports: [AccordionComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  ss = inject(StatesService);
}
