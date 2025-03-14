import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StatesService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  ss = inject(StatesService);
}
