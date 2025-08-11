import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FractalService } from '@services';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  fs = inject(FractalService);
}
