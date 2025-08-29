import { Component, Input, input, output } from '@angular/core';
import { TapEvents } from '@directives';
import { MatButton, MatCardModule } from '@mat';
import { HoldEvents } from '@types';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButton, TapEvents],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() lastHoldEvent?: HoldEvents;
  $like = input<'card' | 'button'>('card');
  $title = input<number | string>('');
  $disableRipple = input(false);

  cardTouch = output();
  cardHoldSave = output();
}
