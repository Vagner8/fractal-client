import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { ControlMenuItems, NewControlMenuItems } from '@constants';
import { TapDirective } from '@directives';
import { MatButtonModule, MatMenuModule } from '@mat';

@Component({
  selector: 'app-new-control-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, TapDirective],
  templateUrl: './new-control-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewControlMenuComponent {
  $title = signal('');
  touch = output<string>();

  items = NewControlMenuItems;
  defaultTitle = ControlMenuItems.Edit;
}
