import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SelectService } from '@services';
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

  title = computed<string>(() => {
    const { New, Edit } = ConstModifiers;
    const modifier = this.ss.modifiers.signal();
    const modifierTitle = modifier === New ? Edit : modifier;
    return `${this.ss.currentFractal.signal()?.cursor} ${modifierTitle || ''}`;
  });
}
