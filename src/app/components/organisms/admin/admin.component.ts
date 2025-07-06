import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StatesService } from '@services';
import { AccordionComponent } from './accordion/accordion.component';
import { MatExpansionModule, MatIconModule } from '@mat';
import { ControlsComponent } from '@components/atoms';

@Component({
  selector: 'app-admin',
  imports: [AccordionComponent, MatIconModule, MatExpansionModule, ControlsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  ss = inject(StatesService);
}
