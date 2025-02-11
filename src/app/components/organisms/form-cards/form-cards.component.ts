import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Fractal } from '@types';
import { ButtonIconComponent, CardComponent } from '@components/atoms';
import { BaseService, ModifiersService, NewControlService, SelectService } from '@services';
import { MatButtonModule } from '@mat';
import { AppEntities } from '@constants';
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
  bs = inject(BaseService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  ncs = inject(NewControlService);
  @Input() fractals: Fractal[] = [];

  onDeleteFormCard(fractal: Fractal): void {
    this.ss.$selected.delete(fractal);
    this.ss.$selected.isEmpty && this.bs.navigate({ [AppEntities.Modifiers]: null });
  }
}
