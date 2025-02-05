import { Component, Input } from '@angular/core';
import { FormCardComponent } from '@components/molecules';
import { Fractal } from '@types';

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
