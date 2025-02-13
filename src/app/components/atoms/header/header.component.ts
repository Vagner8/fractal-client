import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModifiersService, SelectService } from '@services';
import { ConstModifiers } from '@constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  ss = inject(SelectService);
  ms = inject(ModifiersService);

  title = computed<string>(() => {
    const modifier = this.ms.$modifier();
    const modifierTitle = modifier?.is(ConstModifiers.New) ? ConstModifiers.Edit : modifier?.cursor;
    return `${this.ss.$current.signal()?.cursor} ${modifierTitle || ''}`;
  });
}
