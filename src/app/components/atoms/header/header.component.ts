import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { APP_PARAMS } from '@constants';
import { StatesService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  ss = inject(StatesService);
  params = APP_PARAMS;
}
