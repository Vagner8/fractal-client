import { Component, Input, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatButtonModule, MatIcon } from '@mat';

@Component({
  selector: 'app-button-icon',
  standalone: true,
  imports: [MatIcon, MatButtonModule, TapDirective],
  templateUrl: './button-icon.component.html',
})
export class ButtonIconComponent {
  @Input() icon!: string;
  @Input() disableHold = true;
  hold = output();
  touch = output();
}
