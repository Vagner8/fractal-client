import { Component, Input, output } from '@angular/core';
import { MatCardModule } from '@mat';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string | undefined = '';
  @Input() selected = false;
  clicked = output<Event>();
}
