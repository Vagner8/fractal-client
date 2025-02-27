import { Component, Input } from '@angular/core';
import { MatCardModule } from '@mat';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string | undefined = '';
  @Input() selected = false;
}
