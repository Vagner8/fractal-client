import { Component, Input } from '@angular/core';
import { Fractal } from '@types';
import { FormCardComponent } from '../../form-card/form-card.component';

@Component({
  selector: 'app-edit-modifier',
  standalone: true,
  imports: [FormCardComponent],
  templateUrl: './edit-modifier.component.html',
  styleUrl: './edit-modifier.component.scss',
})
export class EditModifierComponent {
  @Input() fractals: Fractal[] = [];
}
