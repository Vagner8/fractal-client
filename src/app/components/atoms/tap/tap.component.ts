import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { TapDirective } from '@directives';
import { Fractal } from '@types';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, TapDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  @Input() tap!: Fractal;

  hold = output<Fractal>();
  touch = output<Fractal>();
}
