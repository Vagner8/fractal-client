import { Component, inject } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@mat';
import { SelectService } from '@services';
import { ListComponent } from '@components/atoms';
import { FractalControlsFormsComponent } from '@components/molecules';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FractalControlsFormsComponent, ListComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent {
  ss = inject(SelectService);
}
