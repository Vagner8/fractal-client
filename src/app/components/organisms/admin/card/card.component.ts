import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule, MatButtonModule, MatCardModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  $fractal = input<Fractal | null>(null);
}
