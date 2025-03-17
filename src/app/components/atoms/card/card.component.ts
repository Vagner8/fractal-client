import { Component, Input, output } from '@angular/core';
import { MatCardModule } from '@mat';
import { DefaultButtonComponent } from '../default-button/default-button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, DefaultButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string | undefined = '';
  @Input() selected = false;
  cardHeaderClicked = output<Event>();
}
