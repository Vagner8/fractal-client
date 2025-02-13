import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { Fractal } from '@types';
import { ButtonIconComponent, CardComponent } from '@components/atoms';
import { ModifiersService, SelectService } from '@services';
import { ConstEditMods } from '@constants';
import { ControlAllFormsComponent, ControlDataFormsComponent } from '@components/molecules';

@Component({
  selector: 'app-fractal-form',
  standalone: true,
  imports: [CardComponent, ButtonIconComponent, ControlDataFormsComponent, ControlAllFormsComponent],
  templateUrl: './fractal-form.component.html',
  styleUrl: './fractal-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FractalFormComponent {
  private ss = inject(SelectService);
  private ms = inject(ModifiersService);
  @Input() fractal!: Fractal;
  $showAllControlForms = computed(() => this.ms.$editMode() === ConstEditMods.Controls);

  onDeleteFormCard(fractal: Fractal): void {
    this.ss.$selected.delete(fractal);
    this.ss.$selected.isEmpty && this.ms.clear();
  }
}
