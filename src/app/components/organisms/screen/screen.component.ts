import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FractalService, StatesService } from '@services';
import { EditorComponent } from '../editor/editor.component';
import { APP_PAGES } from '@constants';
import { ChildrenComponent } from '@components/atoms';

@Component({
  selector: 'app-screen',
  imports: [EditorComponent, ChildrenComponent],
  templateUrl: './screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenComponent {
  @Input() Page = '';
  @Input() Taps = '';
  @Input() Manager = '';
  @Input() Selected = '';
  @Input() EditMode = '';
  @Input() Modifiers = '';

  ss = inject(StatesService);
  fs = inject(FractalService);

  AppPages = APP_PAGES;
}
