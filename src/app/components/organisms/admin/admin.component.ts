import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StatesService } from '@services';
import { CardComponent } from './card/card.component';
@Component({
  selector: 'app-admin',
  imports: [CardComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  ss = inject(StatesService);
}
