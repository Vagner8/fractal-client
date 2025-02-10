import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { SelectService, EntitiesService } from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { TableComponent } from '@components/atoms';
import { FormCardsComponent } from '@components/molecules';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [ControlPanelComponent, ModifierComponent, TableComponent, FormCardsComponent],
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
}
