import { Component, inject, OnDestroy } from '@angular/core';
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
export class ModifierComponent implements OnDestroy {
  ss = inject(SelectService);

  ngOnDestroy(): void {
    this.ss.modifiers.clear();
    this.ss.selectedFractalForm.clear();
    this.ss.selectedFractals.clear();
  }
}
