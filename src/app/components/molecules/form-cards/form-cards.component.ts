import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Fractal } from '@types';
import { CardComponent, FractalMenuComponent } from '@components/atoms';
import { NewControlService, SelectService } from '@services';
import { MatButtonModule } from '@mat';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-form-cards',
  standalone: true,
  imports: [FormComponent, FractalMenuComponent, CardComponent, MatButtonModule],
  templateUrl: './form-cards.component.html',
  styleUrl: './form-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardsComponent {
  ss = inject(SelectService);
  ncs = inject(NewControlService);
  @Input() fractals: Fractal[] = [];

  onClick(fractal: Fractal): void {
    this.ss.setFractalForm(fractal);
  }
}
