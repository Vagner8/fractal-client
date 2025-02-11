import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { Fractal } from '@types';
import { ButtonIconComponent, CardComponent } from '@components/atoms';
import { BaseService, ModifiersService, SelectService } from '@services';
import { MatButtonModule } from '@mat';
import { ConstAppEntities, ConstAppModifiers } from '@constants';
import { FormComponent } from '@components/molecules';

@Component({
  selector: 'app-form-cards',
  standalone: true,
  imports: [FormComponent, CardComponent, MatButtonModule, ButtonIconComponent],
  templateUrl: './form-cards.component.html',
  styleUrl: './form-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardsComponent {
  private bs = inject(BaseService);
  private ss = inject(SelectService);
  private ms = inject(ModifiersService);
  @Input() fractals: Fractal[] = [];
  $renderControls = computed(() => Boolean(this.ms.$prevModifier()?.is(ConstAppModifiers.Edit)));

  onDeleteFormCard(fractal: Fractal): void {
    this.ss.$selected.delete(fractal);
    this.ss.$selected.isEmpty && this.bs.navigate({ [ConstAppEntities.Modifiers]: null });
  }
}
