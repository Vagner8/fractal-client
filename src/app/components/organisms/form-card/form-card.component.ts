import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Fractal } from '@types';
import { FormCardMenuComponent } from './form-card-menu/form-card-menu.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormCardMenuItems, NewControlKeys } from '@constants';
import { CardComponent } from '@components/atoms';
import { FormComponent, NewControlComponent } from '@components/molecules';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [FormComponent, FormCardMenuComponent, NewControlComponent, CardComponent],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardComponent {
  @Input() fractal!: Fractal;

  newControls = new FormArray<FormGroup>([]);

  onMenuItemTouched(menuItem: string): void {
    if (menuItem === FormCardMenuItems.New) {
      this.newControls.push(
        new FormGroup(
          NewControlKeys.values.reduce((acc: Record<string, FormControl>, label) => {
            acc[label] = new FormControl('');
            return acc;
          }, {})
        )
      );
    }
  }
}
