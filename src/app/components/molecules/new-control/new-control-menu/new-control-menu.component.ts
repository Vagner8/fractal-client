import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NewControlMenuItems } from '@constants';
import { MatButtonModule, MatMenuModule } from '@mat';

@Component({
  selector: 'app-new-control-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './new-control-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewControlMenuComponent {
  $title = signal('');

  items = NewControlMenuItems;
}
