import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-panel-button',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './panel-button.html',
  styleUrl: './panel-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelButton {
  readonly $fractal = input<Fractal | null>();
  readonly fractalSelected = output<Fractal>();
}
