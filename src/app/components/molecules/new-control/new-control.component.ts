import { Component, inject, Input } from '@angular/core';
import { CardComponent, InputComponent, SelectComponent } from '@components/atoms';
import { ControlInputs, NewControlKeys, NewControlMenuItems } from '@constants';
import { NewControlMenuComponent } from './new-control-menu/new-control-menu.component';
import { NewControlService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-new-control',
  standalone: true,
  imports: [SelectComponent, InputComponent, CardComponent, NewControlMenuComponent],
  templateUrl: './new-control.component.html',
  styleUrl: './new-control.component.scss',
})
export class NewControlComponent {
  ncs = inject(NewControlService);
  @Input() fractal!: Fractal;

  controlInputs = ControlInputs;
  newControlKeys = NewControlKeys;

  onMenuItemTouched(item: string, index: number): void {
    ({
      [NewControlMenuItems.Copy]: (): void => {
        this.ncs.copy(this.fractal, index);
      },
      [NewControlMenuItems.Cancel]: (): void => {
        this.ncs.removeAt(this.fractal, index);
      },
    })[item]?.();
  }
}
