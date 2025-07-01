import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@mat';
import { StatesService } from '@services';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  ss = inject(StatesService);

  $title = input<number | string>('');
}
