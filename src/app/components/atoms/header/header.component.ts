import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AppModifiers } from '@types';
import { ModifiersService, SelectService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  ss = inject(SelectService);
  ms = inject(ModifiersService);

  title = computed<string>(() => {
    const modifier = this.ms.$modifier();
    const modifierTitle = modifier?.is(AppModifiers.New) ? AppModifiers.Edit : modifier?.cursor;
    return `${this.ss.$current()?.cursor} ${modifierTitle || ''}`;
  });
}
