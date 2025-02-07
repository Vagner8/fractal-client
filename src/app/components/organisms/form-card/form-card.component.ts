import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Fractal } from '@types';
import { FormCardMenuComponent } from './form-card-menu/form-card-menu.component';
import { ControlMenuItems } from '@constants';
import { CardComponent } from '@components/atoms';
import { FormComponent, NewControlComponent } from '@components/molecules';
import { NewControlService } from '@services';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [FormComponent, FormCardMenuComponent, NewControlComponent, CardComponent],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardComponent {
  ncs = inject(NewControlService);
  @Input() fractal!: Fractal;

  onMenuItemTouched(menuItem: string): void {
    if (menuItem === ControlMenuItems.New) {
      this.ncs.push(this.fractal);
    }
  }
}
