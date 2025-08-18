import { Component, input, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatButton, MatCardModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-tile',
  imports: [MatCardModule, MatButton, TapDirective],
  templateUrl: './tile.html',
  styleUrl: './tile.scss',
})
export class Tile {
  $fractal = input<Fractal | null>();
  tileHold = output<Fractal>();
  tileTouch = output<Fractal>();
}
