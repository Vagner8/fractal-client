import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@mat';
import { TapDirective } from '@directives';
import { INDICATORS } from '@constants';
import { Fractal } from '@types';

@Component({
  selector: 'app-tap',
  imports: [MatIconModule, MatButtonModule, TapDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  @Input() tap!: Fractal;
  @Input() title?: string;
  @Input() disabled = false;
  @Input() disableHoldEvent = false;

  hold = output<Fractal>();
  touch = output<Fractal>();

  indicators = INDICATORS;
}
