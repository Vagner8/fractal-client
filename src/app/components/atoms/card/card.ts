import { Component, input, output } from '@angular/core';
import { TapEvents } from '@directives';
import { MatButton, MatCardModule } from '@mat';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButton, TapEvents],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  $like = input<'card' | 'button'>('card');
  $title = input<number | string>('');
  $disableRipple = input(false);

  cardHold = output();
  cardTouch = output();
}
