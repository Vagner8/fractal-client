import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { Fractal } from '@types';
import { ButtonIconComponent, CardComponent } from '@components/atoms';
import { BaseService, ModifiersService, SelectService } from '@services';
import { ConstAppEntities, ConstAppModifiers } from '@constants';
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
  private bs = inject(BaseService);
  private ss = inject(SelectService);
  private ms = inject(ModifiersService);
  @Input() fractal!: Fractal;
  $showAllControlForms = computed(() => {
    const records = this.ms.$records();
    return [records.at(-1), records.at(-2)].every(modifier => modifier?.is(ConstAppModifiers.Edit));
  });

  onDeleteFormCard(fractal: Fractal): void {
    this.ss.$selected.delete(fractal);
    this.ss.$selected.isEmpty && this.bs.navigate({ [ConstAppEntities.Modifiers]: null });
  }
}
