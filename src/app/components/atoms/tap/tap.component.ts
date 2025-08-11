import { Component, input, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatButtonModule, MatIconModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-tap',
  imports: [MatIconModule, MatButtonModule, TapDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
})
export class Tap {
  $fractal = input<Fractal | null>();
  $disabled = input(false);
  $title = input<string>();
  hold = output<Fractal>();
  touch = output<Fractal>();
}
