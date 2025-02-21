import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@mat';
import { TapDirective } from '@directives';
import { Fractal } from '@types';
import { ConstIndicators } from '@constants';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, TapDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  @Input() tap!: Fractal;
  @Input() disableHoldEvent = false;

  hold = output<Fractal>();
  touch = output<Fractal>();

  indicators = ConstIndicators;
}
