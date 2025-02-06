import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@mat';
import { Fractal } from '@types';
import { FormComponent } from '../form/form.component';
import { FormCardMenuComponent } from './form-card-menu/form-card-menu.component';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [MatCardModule, FormComponent, FormCardMenuComponent],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardComponent {
  @Input() fractal!: Fractal;
}
