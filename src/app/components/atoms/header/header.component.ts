import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Fractal } from '@types';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  $fractal = input<Fractal | null>(null);
}
