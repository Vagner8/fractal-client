import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { SelectService, EntitiesService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { ApplicationComponent } from '../application/application.component';
import { TableComponent } from '@components/atoms';
import { ConstPages } from '@constants';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [ApplicationComponent, ModifierComponent, TableComponent],
  templateUrl: './screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenComponent {
  ss = inject(SelectService);
  ent = inject(EntitiesService);

  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Pages = '';
  @Input() Manager = '';
  @Input() Modifiers = '';

  appPages = ConstPages;
}
