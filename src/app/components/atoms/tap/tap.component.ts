import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@mat';
import { TapDirective } from '@directives';
import { ConstIndicators } from '@constants';
import { AbstractFractal } from '@utils';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, TapDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  @Input() tap!: AbstractFractal;
  @Input() disableHoldEvent = false;

  hold = output<AbstractFractal>();
  touch = output<AbstractFractal>();

  indicators = ConstIndicators;
}
