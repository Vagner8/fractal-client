import { Component, input } from '@angular/core';
import { MatCardModule } from '@mat';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  $title = input('');
}
