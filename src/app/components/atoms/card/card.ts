import { Component, input, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatButton, MatCardModule } from '@mat';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButton, TapDirective],
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
